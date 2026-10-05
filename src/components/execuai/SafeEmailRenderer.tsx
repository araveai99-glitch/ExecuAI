"use client";

import * as React from "react";

interface SafeEmailRendererProps {
  content: string;
  className?: string;
}

/**
 * Safely parses and renders email body content.
 * Supports HTML email rendering (with sanitization), escaped HTML decoding,
 * and plain-text fallback formatting.
 */
export const SafeEmailRenderer: React.FC<SafeEmailRendererProps> = ({
  content,
  className = "",
}) => {
  const [renderedState, setRenderedState] = React.useState<{
    isHtml: boolean;
    cleanHtml: string;
    plainText: string;
  }>({
    isHtml: false,
    cleanHtml: "",
    plainText: content || "",
  });

  React.useEffect(() => {
    if (!content) {
      setRenderedState({ isHtml: false, cleanHtml: "", plainText: "" });
      return;
    }

    let str = content;

    // 1. Unescape escaped HTML tags (e.g. &lt;p&gt; -> <p>, &lt;div&gt; -> <div>)
    if (/&lt;[a-z1-6]+[\s&>]/i.test(str)) {
      if (typeof window !== "undefined") {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        str = txt.value;
      } else {
        str = str
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, "&");
      }
    }

    // 2. Check if string contains HTML tags
    const hasHtmlTags = /<[a-z1-6][\s\S]*>/i.test(str);

    if (!hasHtmlTags) {
      setRenderedState({ isHtml: false, cleanHtml: "", plainText: str });
      return;
    }

    // 3. Client-side DOM parsing & sanitization
    if (typeof window !== "undefined") {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, "text/html");

        // Remove dangerous and non-body/structural tags that can break layout or execute scripts
        const forbiddenTags = [
          "script",
          "style",
          "iframe",
          "object",
          "embed",
          "form",
          "link",
          "meta",
          "head",
          "title",
          "applet",
          "base",
        ];
        forbiddenTags.forEach((tag) => {
          doc.querySelectorAll(tag).forEach((el) => el.remove());
        });

        // Clean attributes on all remaining elements
        const allElements = doc.querySelectorAll("*");
        allElements.forEach((el) => {
          // Remove inline event handlers (onclick, onload, etc.) and dangerous attributes
          Array.from(el.attributes).forEach((attr) => {
            const attrName = attr.name.toLowerCase();
            if (attrName.startsWith("on") || attrName === "formaction" || attrName === "action") {
              el.removeAttribute(attr.name);
            }
          });

          // Ensure links open safely in a new tab
          if (el.tagName.toLowerCase() === "a") {
            const href = el.getAttribute("href");
            if (
              href &&
              (href.toLowerCase().startsWith("javascript:") ||
                href.toLowerCase().startsWith("data:"))
            ) {
              el.removeAttribute("href");
            } else {
              el.setAttribute("target", "_blank");
              el.setAttribute("rel", "noopener noreferrer");
              el.classList.add("text-[#F15E1C]", "underline", "hover:opacity-80", "break-all");
            }
          }

          // Ensure images are responsive and bounded
          if (el.tagName.toLowerCase() === "img") {
            el.classList.add("max-w-full", "h-auto", "rounded-lg", "my-2", "inline-block");
          }
        });

        const cleanHtml = doc.body.innerHTML.trim();
        if (cleanHtml) {
          setRenderedState({ isHtml: true, cleanHtml, plainText: str });
          return;
        }
      } catch (err) {
        console.error("DOMParser error during email rendering:", err);
      }
    }

    setRenderedState({ isHtml: false, cleanHtml: "", plainText: str });
  }, [content]);

  if (renderedState.isHtml && renderedState.cleanHtml) {
    return (
      <div
        className={`email-html-content text-xs sm:text-sm text-[#0F172A] leading-relaxed break-words overflow-x-auto ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedState.cleanHtml }}
      />
    );
  }

  return (
    <div
      className={`text-xs sm:text-sm text-[#0F172A] leading-relaxed whitespace-pre-wrap break-words font-sans ${className}`}
    >
      {renderedState.plainText}
    </div>
  );
};
