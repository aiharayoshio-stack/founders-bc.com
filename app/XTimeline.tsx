"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (target?: HTMLElement) => void;
      };
    };
  }
}

const previewPosts = [
  {
    label: "Latest",
    text: "今週末の活動予定を更新しました。PLAY BOLDで一球ずつ積み上げます。",
    meta: "2h / Practice",
  },
  {
    label: "Recruit",
    text: "選手・マネージャー募集中。野球が好きなメンバーを歓迎しています。",
    meta: "1d / Members",
  },
  {
    label: "Game",
    text: "練習試合の対戦相手も随時募集中です。詳細はDMからお願いします。",
    meta: "3d / Match",
  },
];

export function XTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTimeline = () => {
      window.twttr?.widgets?.load(timelineRef.current ?? undefined);
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-x-widgets="true"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", loadTimeline);
      loadTimeline();

      return () => {
        existingScript.removeEventListener("load", loadTimeline);
      };
    }

    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.dataset.xWidgets = "true";
    script.src = "https://platform.twitter.com/widgets.js";
    script.addEventListener("load", loadTimeline);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", loadTimeline);
    };
  }, []);

  return (
    <div className="xEmbedLive" aria-label="Xタイムライン表示枠" ref={timelineRef}>
      <a
        className="twitter-timeline"
        data-chrome="noheader nofooter noborders"
        data-dnt="true"
        data-height="420"
        data-theme="dark"
        data-tweet-limit="3"
        data-width="390"
        href="https://twitter.com/Founders311551?ref_src=twsrc%5Etfw"
      >
        @Founders311551
      </a>
      <div className="xPreviewFallback" aria-hidden="true">
        <div className="xPreviewHeader">
          <span className="xAvatar">F</span>
          <div>
            <strong>Founders</strong>
            <span>@Founders311551</span>
          </div>
          <span className="xMark">X</span>
        </div>
        {previewPosts.map((post) => (
          <article className="xPreviewPost" key={post.label}>
            <div>
              <span>{post.label}</span>
              <small>{post.meta}</small>
            </div>
            <p>{post.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
