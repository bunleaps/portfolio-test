"use client"; // This is a client component

import React from "react";
import { Highlight, themes } from "prism-react-renderer";

// Determine if dark mode is active (can be integrated with a proper theme context)
const isDarkMode =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
// Choose a minimalist theme. 'github' for light, 'dracula' or 'vsDark' for dark.
const codeTheme = isDarkMode ? themes.dracula : themes.github; // Using themes from prism-react-renderer

export default function CodeRenderer({ className, children }) {
  const languageMatch = /language-(\w+)/.exec(className || "");
  const language = languageMatch ? languageMatch[1] : null;

  const codeContent = String(children).trim(); // Trim to remove extra newlines from markdown parsing

  // If a language is detected, it's a code block (fenced code block)
  if (language) {
    return (
      <div className="overflow-x-auto my-8 border border-gray-200 dark:border-gray-700 rounded-lg">
        <Highlight theme={codeTheme} code={codeContent} language={language}>
          {({
            className: highlightClassName,
            style,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <pre
              className="!my-0 !p-6 rounded-lg text-base font-mono leading-relaxed"
              style={style}
            >
              {tokens.map((line, i) => {
                // Destructure 'key' from getLineProps and apply it directly
                const { key: lineKey, ...lineProps } = getLineProps({
                  line,
                  key: i,
                });
                return (
                  <div key={lineKey} {...lineProps}>
                    {line.map((token, j) => {
                      // Destructure 'key' from getTokenProps and apply it directly
                      const { key: tokenKey, ...tokenProps } = getTokenProps({
                        token,
                        key: j,
                      });
                      return <span key={tokenKey} {...tokenProps} />;
                    })}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    );
  }

  // Otherwise, it's inline code
  return (
    <code className="bg-gray-200 dark:bg-gray-700 text-red-600 dark:text-red-300 px-1.5 py-0.5 rounded-md text-base font-mono whitespace-nowrap">
      {children}
    </code>
  );
}
