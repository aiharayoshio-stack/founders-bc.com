"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type NewsItem = {
  date: string;
  title: string;
  category: string;
  summary: string;
  body: string[];
};

const newsItems: NewsItem[] = [
  {
    date: "2024/03/01",
    title: "「FOUNDERS」創部のお知らせ",
    category: "Team",
    summary: "本大会出場に向けて、チーム一丸となって準備を進めています。",
    body: [
      "第97回都市対抗野球大会の本大会出場が決定しました。日頃より応援いただいている皆さまに、心より感謝申し上げます。",
      "本大会ではPLAY BOLDのスローガンを胸に、最後まで攻める姿勢を貫きます。試合情報や応援案内は、詳細が決まり次第お知らせします。",
    ],
  },
  {
    date: "2024/03/09",
    title: "「IT LEAGUE」に参加しました",
    category: "Schedule",
    summary: "東海地区2次予選の試合日程に変更があります。",
    body: [
      "天候および大会運営の都合により、東海地区2次予選の一部日程が変更となりました。",
      "観戦を予定されている方は、試合前に最新のスケジュールをご確認ください。チーム公式Xでも随時情報を発信します。",
    ],
  },
  {
    date: "2025/07/10",
    title: "スポンサード契約についてのお知らせ",
    category: "Event",
    summary: "地域の皆さまと一緒に、野球の楽しさを共有しました。",
    body: [
      "西階公園野球場のオープン記念式典にチームメンバーが参加しました。",
      "当日は野球教室も実施し、子どもたちとキャッチボールや打撃練習を行いました。今後も地域に根ざした活動を大切にしていきます。",
    ],
  },
  {
    date: "2025/07/10",
    title: "スポンサード契約についてのお知らせ",
    category: "Ticket",
    summary: "予選観戦チケットに関する基本情報をまとめました。",
    body: [
      "東海地区2次予選の観戦チケットについて、販売開始時期と入場方法の案内を準備しています。",
      "応援エリアや受付方法など、詳細は決定後に改めて掲載します。ご来場の際は余裕を持ってお越しください。",
    ],
  },
  {
    date: "2025/11/15",
    title: "「IT LEAGUE 2025」 で優勝を飾りました！",
    category: "Partner",
    summary: "チーム活動を支えてくださるパートナー企業を募集しています。",
    body: [
      "チームの活動理念に共感し、ともに地域スポーツを盛り上げてくださるパートナー企業を募集しています。",
      "ロゴ掲載、イベント連携、SNSでの紹介など、チームの成長に合わせた協賛メニューを準備しています。",
    ],
  },
  {
    date: "2026/04/01",
    title: "「プライドジャパンドリームカップ2026（東京都予選）」出場のお知らせ",
    category: "Team",
    summary: "本大会出場に向けて、チーム一丸となって準備を進めています。",
    body: [
      "第97回都市対抗野球大会の本大会出場が決定しました。日頃より応援いただいている皆さまに、心より感謝申し上げます。",
      "本大会ではPLAY BOLDのスローガンを胸に、最後まで攻める姿勢を貫きます。試合情報や応援案内は、詳細が決まり次第お知らせします。",
    ],
  },
];

export function NewsSection() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sortedNewsItems = [...newsItems].sort((left, right) => right.date.localeCompare(left.date));

  const openNewsModal = (item: NewsItem) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setIsModalClosing(false);
    setSelectedNews(item);
  };

  const closeNewsModal = useCallback(() => {
    if (!selectedNews || isModalClosing) {
      return;
    }

    setIsModalClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setSelectedNews(null);
      setIsModalClosing(false);
      closeTimerRef.current = null;
    }, 220);
  }, [isModalClosing, selectedNews]);

  useEffect(() => {
    if (!selectedNews) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeNewsModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeNewsModal, selectedNews]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="newsBand" id="news">
      <div className="sectionHeader">
        <p className="sectionLabel">News</p>
        <h2>チームニュース</h2>
      </div>
      <div className="newsList">
        {sortedNewsItems.map((item, index) => (
          <button className="newsItem" key={`${item.date}-${item.title}-${index}`} onClick={() => openNewsModal(item)} type="button">
            <time>{item.date}</time>
            <span className="newsDivider" aria-hidden="true" />
            <h3>{item.title}</h3>
            <span className="newsArrow" aria-hidden="true">›</span>
          </button>
        ))}
      </div>

      {selectedNews && (
        <div
          className="newsModalOverlay"
          data-closing={isModalClosing}
          onClick={closeNewsModal}
          role="presentation"
        >
          <article
            aria-labelledby="news-modal-title"
            aria-modal="true"
            className="newsModal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button aria-label="閉じる" className="modalClose" onClick={closeNewsModal} type="button">
              ×
            </button>
            <div className="newsModalMeta">
              <span>{selectedNews.category}</span>
              <time>{selectedNews.date}</time>
            </div>
            <h3 id="news-modal-title">{selectedNews.title}</h3>
            <p className="newsModalLead">{selectedNews.summary}</p>
            <div className="newsModalBody">
              {selectedNews.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
