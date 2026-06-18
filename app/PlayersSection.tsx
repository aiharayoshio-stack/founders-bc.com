"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Position = "投手" | "捕手" | "内野手" | "外野手";

type Player = {
  number: string;
  name: string;
  romanName: string;
  position: Position;
  role: string;
  detail: string;
  style: string;
  joined: string;
  profile: string;
  throwingBatting: string;
  school: string;
  birthdate: string;
  birthplace: string;
  body: string;
  department: string;
  salesPoint: string;
};

type RosterEntry = Pick<Player, "number" | "name" | "romanName" | "position"> &
  Partial<
    Pick<Player, "throwingBatting" | "school" | "birthdate" | "birthplace" | "body" | "department" | "salesPoint">
  >;

const positions: Position[] = ["投手", "捕手", "内野手", "外野手"];

const positionProfiles: Record<Position, Omit<Player, "number" | "name" | "romanName" | "position">> = {
  投手: {
    role: "Pitcher",
    detail: "マウンドから試合の流れを作る投手メンバー。",
    style: "Power / Control",
    profile:
      "テンポよくストライクを重ね、守備からチームのリズムを作るタイプ。大事な場面で腕を振れる強さを武器にします。",
    joined: "2026",
    throwingBatting: "右投右打",
    school: "プロフィール準備中",
    birthdate: "プロフィール準備中",
    birthplace: "プロフィール準備中",
    body: "プロフィール準備中",
    department: "プロフィール準備中",
    salesPoint: "マウンドで流れを作る投球",
  },
  捕手: {
    role: "Catcher",
    detail: "守備の中心として試合を読む、頼れる司令塔。",
    style: "Lead / Block",
    profile:
      "投手の良さを引き出しながら、試合全体を落ち着いて組み立てる存在。細かな声かけでチームを締めます。",
    joined: "2026",
    throwingBatting: "右投右打",
    school: "プロフィール準備中",
    birthdate: "プロフィール準備中",
    birthplace: "プロフィール準備中",
    body: "プロフィール準備中",
    department: "プロフィール準備中",
    salesPoint: "守備の中心として試合を動かすリード",
  },
  内野手: {
    role: "Infielder",
    detail: "堅実な守備と勝負強い打撃で内野を締める。",
    style: "Glove / Contact",
    profile:
      "一歩目の反応と送球の安定感で流れを切らさないプレーヤー。攻撃ではつなぐ意識を大切にします。",
    joined: "2026",
    throwingBatting: "右投右打",
    school: "プロフィール準備中",
    birthdate: "プロフィール準備中",
    birthplace: "プロフィール準備中",
    body: "プロフィール準備中",
    department: "プロフィール準備中",
    salesPoint: "堅実な守備と勝負強い打撃",
  },
  外野手: {
    role: "Outfielder",
    detail: "広い守備範囲と走力でチャンスを広げる。",
    style: "Speed / Range",
    profile:
      "広いフィールドをカバーし、長打を防ぐ守備範囲が持ち味。走塁でも次の塁を狙う姿勢を見せます。",
    joined: "2026",
    throwingBatting: "右投右打",
    school: "プロフィール準備中",
    birthdate: "プロフィール準備中",
    birthplace: "プロフィール準備中",
    body: "プロフィール準備中",
    department: "プロフィール準備中",
    salesPoint: "広い守備範囲と積極的な走塁",
  },
};

const rosterEntries: RosterEntry[] = [
  { number: "26", name: "金子 晋也", romanName: "KANEKO SHINYA", position: "外野手" },
  { number: "55", name: "北尾 共", romanName: "KITAO TOMO", position: "外野手" },
  { number: "42", name: "西田 燎平", romanName: "NISHIDA RYOHEI", position: "内野手" },
  { number: "9", name: "片岡 宏斗", romanName: "KATAOKA HIROTO", position: "内野手" },
  { number: "50", name: "磯田 将太", romanName: "ISODA SHOTA", position: "内野手" },
  { number: "1", name: "橋本 駿", romanName: "HASHIMOTO SHUN", position: "外野手" },
  { number: "25", name: "宮城 圭介", romanName: "MIYAGI KEISUKE", position: "捕手" },
  {
    number: "3",
    name: "相原 嘉夫",
    romanName: "AIHARA YOSHIO",
    position: "内野手",
    throwingBatting: "右投右打",
    school: "明徳義塾中-浦和学院高",
    birthdate: "1995年12月8日",
    birthplace: "神奈川県川崎市",
    body: "171cm/70kg",
    department: "起業家",
    salesPoint: "勝負強い打撃",
  },
  { number: "27", name: "児山 一樹", romanName: "KOYAMA KAZUKI", position: "捕手" },
  { number: "29", name: "毛利 拓樹", romanName: "MOURI TAKUKI", position: "投手" },
  { number: "23", name: "山木 陸生", romanName: "YAMAKI RIKUO", position: "外野手" },
  { number: "10", name: "小林 晃", romanName: "KOBAYASHI AKIRA", position: "捕手" },
  { number: "6", name: "スティーブコバヤシ", romanName: "STEVE KOBAYASHI", position: "外野手" },
  { number: "66", name: "小澤 真彦", romanName: "OZAWA MASAHIKO", position: "外野手" },
  { number: "36", name: "井上 隆太朗", romanName: "INOUE RYUTARO", position: "内野手" },
  { number: "99", name: "甚野 広行", romanName: "JINNO HIROYUKI", position: "内野手" },
  { number: "4", name: "辻江 樹生", romanName: "TSUJIE TATSUKI", position: "内野手" },
  { number: "51", name: "長谷川 大将", romanName: "HASEGAWA DAISUKE", position: "外野手" },
  { number: "33", name: "伊藤 聡", romanName: "ITO SATOSHI", position: "内野手" },
  { number: "2", name: "伊藤 源一", romanName: "ITO GENICHI", position: "内野手" },
  { number: "16", name: "塚田 淳矢", romanName: "TSUKADA JUNYA", position: "投手" },
  { number: "17", name: "山田 優大", romanName: "YAMADA YUDAI", position: "投手" },
  { number: "19", name: "翁 安毅", romanName: "OKINA YASUTAKE", position: "投手" },
  { number: "21", name: "滝島 大貴", romanName: "TAKISHIMA DAIKI", position: "投手" },
  { number: "13", name: "髙木 聡吾", romanName: "TAKAGI SOGO", position: "外野手" },
  { number: "7", name: "結束 大智", romanName: "KESSOKU DAICHI", position: "外野手" },
];

const comparePlayersByNumber = (left: Player, right: Player) => Number(left.number) - Number(right.number);

const players: Player[] = rosterEntries
  .map((entry) => ({
    ...positionProfiles[entry.position],
    ...entry,
  }))
  .sort(comparePlayersByNumber);

const pitchMetrics = [
  ["球速", "163 km/h"],
  ["スタミナ", "B 72"],
  ["疲労回復", "B 68"],
  ["先発適性", "◎"],
  ["中継適性", "○"],
  ["抑え適性", "-"],
];

const fielderMetrics = [
  { label: "ミート", split: "対右", rank: "D", score: "57" },
  { label: "", split: "対左", rank: "D", score: "51" },
  { label: "パワー", rank: "S", score: "95" },
  { label: "走力", rank: "B", score: "78" },
  { label: "捕球", rank: "D", score: "54" },
  { label: "スローイング", rank: "C", score: "68" },
  { label: "肩力", rank: "A", score: "85" },
  { label: "疲労回復", rank: "S", score: "94" },
];

const playerAbilities = [
  ["ケガしにくさ", "B", "abilityBlue"],
  ["対ピンチ", "C", "abilityPink"],
  ["クイック", "C", "abilityPink"],
  ["打たれ強さ", "B", "abilityPink"],
  ["対左打者", "C", "abilityPink"],
  ["力配分", "", "abilityPink"],
  ["シュート回転", "", "abilityBlue"],
];

const playerPhotoFrames = [
  {
    caption: "Profile Photo",
    label: "01",
    tone: "galleryPortrait",
  },
  {
    caption: "Game Action",
    label: "02",
    tone: "galleryAction",
  },
  {
    caption: "Team Shot",
    label: "03",
    tone: "galleryTeam",
  },
];

export function PlayersSection() {
  const [activePosition, setActivePosition] = useState<Position>("投手");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const photoScrollerRef = useRef<HTMLDivElement | null>(null);

  const filteredPlayers = useMemo(
    () => players.filter((player) => player.position === activePosition),
    [activePosition],
  );

  const openPlayerModal = (player: Player) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setIsModalClosing(false);
    setActivePhotoIndex(0);
    setSelectedPlayer(player);
  };

  const closePlayerModal = useCallback(() => {
    if (!selectedPlayer || isModalClosing) {
      return;
    }

    setIsModalClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setSelectedPlayer(null);
      setIsModalClosing(false);
      closeTimerRef.current = null;
    }, 220);
  }, [isModalClosing, selectedPlayer]);

  const movePhoto = (direction: "next" | "previous") => {
    const nextIndex =
      direction === "next"
        ? (activePhotoIndex + 1) % playerPhotoFrames.length
        : (activePhotoIndex - 1 + playerPhotoFrames.length) % playerPhotoFrames.length;

    setActivePhotoIndex(nextIndex);

    const target = photoScrollerRef.current?.children[nextIndex] as HTMLElement | undefined;
    target?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const updatePhotoIndexFromScroll = () => {
    const scroller = photoScrollerRef.current;

    if (!scroller) {
      return;
    }

    const nextIndex = Math.round(scroller.scrollLeft / Math.max(scroller.clientWidth, 1));
    const clampedIndex = Math.min(Math.max(nextIndex, 0), playerPhotoFrames.length - 1);

    setActivePhotoIndex((currentIndex) => (currentIndex === clampedIndex ? currentIndex : clampedIndex));
  };

  useEffect(() => {
    if (!selectedPlayer) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePlayerModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePlayerModal, selectedPlayer]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="playersBand" id="players">
      <div className="sectionHeader">
        <p className="sectionLabel">Players</p>
        <h2>選手紹介</h2>
      </div>

      <div className="positionTabs" role="tablist" aria-label="ポジション">
        {positions.map((position) => (
          <button
            aria-selected={activePosition === position}
            className="positionTab"
            key={position}
            onClick={() => setActivePosition(position)}
            role="tab"
            type="button"
          >
            {position}
          </button>
        ))}
      </div>

      <div className="playersMeta" aria-live="polite">
        <strong>{activePosition}</strong>
        <span>{filteredPlayers.length} Members</span>
      </div>

      <div className="playerGrid">
        {filteredPlayers.map((player) => (
          <button
            className="playerCard"
            key={`${player.number}-${player.name}`}
            onClick={() => openPlayerModal(player)}
            type="button"
          >
            <span className="playerPhoto">
              <span>{player.number}</span>
            </span>
            <span className="playerInfo">
              <span className="playerRole">{player.role}</span>
              <strong>{player.name}</strong>
              <span>{player.detail}</span>
            </span>
          </button>
        ))}
      </div>

      {selectedPlayer && (
        <div
          className="playerModalOverlay"
          data-closing={isModalClosing}
          onClick={closePlayerModal}
          role="presentation"
        >
          <div
            aria-labelledby="player-modal-title"
            aria-modal="true"
            className="playerModal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="閉じる"
              className="modalClose"
              onClick={closePlayerModal}
              type="button"
            >
              ×
            </button>
            <div className="modalPlayerProfilePanel">
              <p className="profileEyebrow">Profile</p>
              <h3 id="player-modal-title">{selectedPlayer.name}</h3>
              <p className="profileRomanName">{selectedPlayer.romanName}</p>
              <div className="playerPositionBadge">
                {selectedPlayer.position} <span>|</span> {selectedPlayer.throwingBatting}
              </div>

              <div className="modalPhotoGallery">
                <div
                  aria-label={`${selectedPlayer.name}の写真`}
                  className="modalPhotoScroller"
                  onScroll={updatePhotoIndexFromScroll}
                  ref={photoScrollerRef}
                >
                  {playerPhotoFrames.map((photo) => (
                    <figure className={`modalPlayerPhoto ${photo.tone}`} key={photo.label}>
                      <span>{selectedPlayer.number}</span>
                      <figcaption>
                        {photo.label} / {photo.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <button
                  aria-label="前の写真"
                  className="photoNavButton photoNavPrevious"
                  onClick={() => movePhoto("previous")}
                  type="button"
                >
                  ‹
                </button>
                <button
                  aria-label="次の写真"
                  className="photoNavButton photoNavNext"
                  onClick={() => movePhoto("next")}
                  type="button"
                >
                  ›
                </button>
                <div className="photoDots" aria-label="写真の表示位置">
                  {playerPhotoFrames.map((photo, index) => (
                    <span aria-current={activePhotoIndex === index} key={photo.label} />
                  ))}
                </div>
              </div>
            </div>
            <div className="modalPlayerInfo">
              <dl className="profileDataList">
                {[
                  ["球歴 / 学歴", selectedPlayer.school],
                  ["生年月日", selectedPlayer.birthdate],
                  ["出身地", selectedPlayer.birthplace],
                  ["身長 / 体重", selectedPlayer.body],
                  ["職業", selectedPlayer.department],
                  ["俺のここを見てくれ！", selectedPlayer.salesPoint],
                ].map(([label, value]) => (
                  <div className="profileDataRow" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <div
                className="pitchProfilePanel"
                aria-label={selectedPlayer.position === "投手" ? "投球データ" : "野手能力データ"}
              >
                <section
                  className="pitchArsenalCard"
                  aria-label={selectedPlayer.position === "投手" ? "球種" : "守備適正"}
                >
                  <div
                    className="pitchMap"
                    aria-label={
                      selectedPlayer.position === "投手"
                        ? "球種マップ画像アップロード予定"
                        : "守備適正画像アップロード予定"
                    }
                  >
                    <span>{selectedPlayer.position === "投手" ? "球種マップ" : "守備適正"}</span>
                  </div>
                </section>

                <div className="pitchDataGrid">
                  <section
                    className={`pitchStatsCard ${selectedPlayer.position === "投手" ? "" : "fielderStatsCard"}`}
                    aria-label={selectedPlayer.position === "投手" ? "投手能力" : "野手能力"}
                  >
                    {selectedPlayer.position === "投手"
                      ? pitchMetrics.map(([label, value]) => (
                          <div className="pitchStatRow" key={label}>
                            <span>{label}</span>
                            <strong>{value}</strong>
                          </div>
                        ))
                      : fielderMetrics.map((metric) => (
                          <div className="fielderStatRow" key={`${metric.label}-${metric.split ?? metric.rank}`}>
                            <span className="fielderStatLabel">{metric.label}</span>
                            <span className="fielderStatSplit">{metric.split}</span>
                            <strong className={`fielderRank rank${metric.rank}`}>{metric.rank}</strong>
                            <b>{metric.score}</b>
                          </div>
                        ))}
                  </section>

                  <section className="playerAbilitiesCard" aria-label="特殊能力">
                    {playerAbilities.map(([label, rank, tone]) => (
                      <div className="abilityRow" key={label}>
                        <span className={`abilityMarker ${tone}`} />
                        <strong>{label}</strong>
                        {rank && <b>{rank}</b>}
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
