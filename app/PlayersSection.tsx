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
    school: "準備中",
    birthdate: "準備中",
    birthplace: "準備中",
    body: "準備中",
    department: "準備中",
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
    school: "準備中",
    birthdate: "準備中",
    birthplace: "準備中",
    body: "準備中",
    department: "準備中",
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
    school: "準備中",
    birthdate: "準備中",
    birthplace: "準備中",
    body: "準備中",
    department: "準備中",
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
    school: "準備中",
    birthdate: "準備中",
    birthplace: "準備中",
    body: "準備中",
    department: "準備中",
    salesPoint: "広い守備範囲と積極的な走塁",
  },
};

const rosterEntries: RosterEntry[] = [
  {
    number: "26",
    name: "金子 晋也",
    romanName: "SHINYA KANEKO",
    position: "捕手",
    throwingBatting: "右投右打",
    school: "志学館高 - 神奈川大",
    birthdate: "1992/10/20",
    birthplace: "千葉県",
    body: "170cm/65kg",
    department: "サラリーマン",
    salesPoint: "左手の薬指",
  },
  {
    number: "55",
    name: "北尾 共",
    romanName: "KYO KITAO",
    position: "外野手",
    throwingBatting: "右投右打",
    school: "帯広緑陽高",
    birthdate: "1999/06/04",
    birthplace: "北海道",
    body: "172cm/65kg",
    department: "スタートアップ役員",
    salesPoint: "バッティング！",
  },
  {
    number: "42",
    name: "西田 燎平",
    romanName: "RYOHEI NISHIDA",
    position: "内野手",
    throwingBatting: "右投右打",
    school: "京都大学大学院",
    birthdate: "1996/09/02",
    birthplace: "兵庫県",
    body: "175cm/80kg",
    department: "起業家/弁護士",
    salesPoint: "おしり",
  },
  {
    number: "9",
    name: "片岡 宏斗",
    romanName: "Kataoka Hiroto",
    position: "内野手",
    throwingBatting: "左投左打",
    school: "鎌倉学園高 - 慶應義塾大",
    birthdate: "1998/09/12",
    birthplace: "神奈川県",
    body: "179cm/ 78kg",
    salesPoint: "ウォーミングアップ",
  },
  {
    number: "50",
    name: "磯田 将太",
    romanName: "SHOTA ISODA",
    position: "内野手",
    throwingBatting: "右投右打",
    school: "早大学院高",
    birthdate: "1995/03/06",
    birthplace: "埼玉県",
    body: "172cm/65kg",
    department: "ベンチャーキャピタリスト",
    salesPoint: "試合前バッセンでの選球眼",
  },
  {
    number: "1",
    name: "橋本 駿",
    romanName: "Shun Hashimoto",
    position: "外野手",
    throwingBatting: "右投左打",
    school: "巣鴨高 - 慶應義塾大",
    birthdate: "2002/01/06",
    birthplace: "東京都",
    body: "176cm/70kg",
    department: "会社員",
    salesPoint: "ひたむきな献身性",
  },
  {
    number: "25",
    name: "宮城 圭介",
    romanName: "KEISUKE MIYAGI",
    position: "捕手",
    throwingBatting: "右投左打",
    school: "足立学園高 - 國學院大",
    birthdate: "1991/10/26",
    birthplace: "東京都",
    body: "178cm/115kg",
    department: "ベンチャーキャピタリスト",
    salesPoint: "体重",
  },
  {
    number: "3",
    name: "相原 嘉夫",
    romanName: "AIHARA YOSHIO",
    position: "内野手",
    throwingBatting: "右投右打",
    school: "青山学院大学大学院",
    birthdate: "1995/12/08",
    birthplace: "神奈川県川崎市",
    body: "171cm/70kg",
    department: "起業家",
    salesPoint: "勝負強い打撃",
  },
  {
    number: "27",
    name: "児山 一樹",
    romanName: "KAZUKI KOYAMA",
    position: "捕手",
    throwingBatting: "右投右打",
    school: "東京ヤクルトスワローズジュニア - 浦和シニア - 浦和西高 - 一橋大学大学院",
    birthdate: "1993/05/22",
    birthplace: "埼玉県",
    body: "163cm/62kg",
    department: "ベンチャーキャピタリスト",
    salesPoint: "バッティングフォーム",
  },
  {
    number: "29",
    name: "毛利 拓樹",
    romanName: "Mohri Hiroki",
    position: "投手",
    throwingBatting: "右投右打",
    school: "横浜翠嵐高 - 東京大",
    birthdate: "1991/09/29",
    birthplace: "神奈川県",
    body: "181cm/86kg",
    salesPoint: "肩幅",
  },
  {
    number: "8",
    name: "池田 章人",
    romanName: "AKIHITO IKEDA",
    position: "外野手",
    throwingBatting: "右投左打",
    school: "長野日大高 - 日本大 - エイジェック",
    birthdate: "2000/01/20",
    birthplace: "長野県",
    body: "173cm/75kg",
    department: "スーパーサラリーマン",
    salesPoint: "やる気",
  },
  {
    number: "10",
    name: "小林 晃",
    romanName: "KO KOBAYASHI",
    position: "捕手",
    throwingBatting: "右投右打",
    school: "佐倉高 - 東北大",
    birthdate: "1997/07/10",
    birthplace: "東京都",
    body: "172cm/58kg",
    department: "ベンチャーキャピタリスト",
    salesPoint: "年1回参加の秘密兵器",
  },
  {
    number: "6",
    name: "小林 スティーブ巧汰",
    romanName: "Kota Steve Kobayashi",
    position: "外野手",
    throwingBatting: "右投左打",
    school: "日本大学高 - ベネディクティンカレッジ(米)",
    birthdate: "1993/11/12",
    birthplace: "神奈川県横浜市",
    body: "177cm/68kg",
    department: "人間教育家",
    salesPoint: "ユニフォームの着こなし",
  },
  {
    number: "66",
    name: "小澤 真彦",
    romanName: "MASAHIKO OZAWA",
    position: "外野手",
    throwingBatting: "右投左打",
    school: "山口大",
    birthdate: "1989/01/24",
    birthplace: "山口県",
    body: "175cm/65kg",
    department: "銀行員",
    salesPoint: "出身地",
  },
  {
    number: "36",
    name: "井上 隆太朗",
    romanName: "Ryutaro Inoue",
    position: "内野手",
    throwingBatting: "右投右打",
    school: "準備中",
    birthdate: "準備中",
    birthplace: "準備中",
    body: "準備中",
    department: "準備中",
    salesPoint: "準備中",
  },
  {
    number: "4",
    name: "辻江 樹生",
    romanName: "Tsujie Tatsuki",
    position: "内野手",
    throwingBatting: "右投右打",
    school: "洛南高 - 立命館大",
    birthdate: "1997/02/18",
    birthplace: "奈良県",
    body: "165cm/63kg",
    department: "公認会計士/サステナビリティコンサルタント",
    salesPoint: "守備",
  },
  {
    number: "51",
    name: "長谷川 大将",
    romanName: "Daisuke Hasegawa",
    position: "外野手",
    throwingBatting: "右投左打",
    school: "九州学院高 - 東洋大",
    birthdate: "1997/08/18",
    birthplace: "福岡県",
    body: "177cm/85kg",
    department: "会社員",
    salesPoint: "稀にみる盗塁",
  },
  {
    number: "33",
    name: "伊藤 聡",
    romanName: "Satoshi Ito",
    position: "内野手",
    throwingBatting: "右投右打",
    school: "星陵高 - 関西学院大",
    birthdate: "1996/05/02",
    birthplace: "兵庫県",
    body: "173cm/60kg",
    department: "ベンチャーキャピタリスト",
    salesPoint: "PRPした肩",
  },
  {
    number: "2",
    name: "伊藤 源一",
    romanName: "GEN♪GEN♪",
    position: "内野手",
    throwingBatting: "右投右打",
    school: "東海大浦安高 - 東海大",
    birthdate: "田中角栄さんと同じ",
    birthplace: "千葉県",
    body: "172cm/75kg",
    department: "アドマン",
    salesPoint: "ミスター右中間",
  },
  {
    number: "16",
    name: "塚田 淳矢",
    romanName: "Junya Tsukada",
    position: "投手",
    throwingBatting: "右投左打",
    school: "日大二高 - 日本大",
    birthdate: "2001/02/23",
    birthplace: "東京都",
    body: "178cm/75kg",
    department: "監査",
    salesPoint: "とても大きな声",
  },
  {
    number: "17",
    name: "山田 優大",
    romanName: "YUDAI YAMADA",
    position: "投手",
    throwingBatting: "右投右打",
    school: "穎明館高 - 国際基督教大",
    birthdate: "1989/06/23",
    birthplace: "東京都",
    body: "171cm/72kg",
    department: "ベンチャーキャピタリスト",
    salesPoint: "闘志",
  },
  {
    number: "19",
    name: "翁 安毅",
    romanName: "YASUTAKE OH",
    position: "外野手",
    throwingBatting: "右投右打",
    school: "小田原高 - 慶應義塾大",
    birthdate: "2002/05/27",
    birthplace: "神奈川県",
    body: "190cm/88kg",
    department: "ベンチャーキャピタリスト",
    salesPoint: "フルスイング",
  },
  {
    number: "21",
    name: "滝島 大貴",
    romanName: "HIROKI TAKISHIMA",
    position: "投手",
    throwingBatting: "右投右打",
    school: "慶應義塾湘南藤沢高 - 慶應義塾大",
    birthdate: "1992/06/17",
    birthplace: "東京都",
    body: "174cm/79kg",
    department: "会社経営者",
    salesPoint: "無限のスタミナ",
  },
  {
    number: "13",
    name: "髙木 聡吾",
    romanName: "SOGO TAKAGI",
    position: "外野手",
    throwingBatting: "左投左打",
    school: "岐阜高 - 早稲田大",
    birthdate: "1995/09/21",
    birthplace: "岐阜県",
    body: "170cm/65kg",
    department: "公認会計士",
    salesPoint: "ミート",
  },
  {
    number: "7",
    name: "結束 大智",
    romanName: "DAICHI KESSOKU",
    position: "外野手",
    throwingBatting: "右投左打",
    school: "健大高崎高 - 立教大",
    birthdate: "2006/03/10",
    birthplace: "茨城県",
    body: "175cm/75kg",
    department: "大学生/個人事業主",
    salesPoint: "ホームラン",
  },
];

const playerIntroductions: Record<string, string> = {
  "塚田 淳矢": "キレ味抜群の投球で投手陣を支える次世代エース候補",
  "山田 優大": "多彩な変化球と強気な投球が武器の昨季MVPエース",
  "滝島 大貴": "物怖じせず腕を振り続ける無限スタミナ変則右腕",
  "毛利 拓樹": "直球と変化のコンビネーションが武器のイケメン右腕",
  "小林 晃": "チームNo.1のガヤ芸人",
  "宮城 圭介": "不動の4番として攻守でチームを引っ張る扇の要",
  "金子 晋也": "全ポジションを守るユーティリティクラッチヒッター",
  "児山 一樹": "走攻守三拍子揃ったピカピカ球歴ボーイ",
  "伊藤 源一": "勝負強い打撃と堅実な守備でチームを支える最強戦士",
  "相原 嘉夫": "攻守でチームを牽引する得点圏の鬼",
  "辻江 樹生": "堅実な守備でチームを支える守備職人",
  "片岡 宏斗": "チーム屈指の打撃力で勝利を呼び込む最強バッター",
  "伊藤 聡": "チーム随一の球際の強さを誇るスーパープレイヤー",
  "井上 隆太朗": "高次元で内野全ポジションを守るユーティリティ選手",
  "西田 燎平": "抜群の野球センスで攻守で結果を出し続ける化け物",
  "磯田 将太": "シュアな打撃でチームを救う必殺仕事人",
  "橋本 駿": "超俊足でチームを勇気づける切込隊長",
  "小林 スティーブ巧汰": "内外野をこなすチャンスに強い中距離ヒッター",
  "結束 大智": "抜群の選球眼が光る打撃センスの塊",
  "池田 章人": "ポーカーフェイスで淡々と大仕事をする超信頼選手",
  "髙木 聡吾": "どんな投手でもアジャストする神ミートマン",
  "翁 安毅": "全球強振の打撃スタイルで打線を支える",
  "長谷川 大将": "広角に長打を打ち分ける打撃の神様",
  "北尾 共": "確実性を兼ね備えたゴジラ",
  "小澤 真彦": "爆肩でチームを救う守備職人",
};

const comparePlayersByNumber = (left: Player, right: Player) => Number(left.number) - Number(right.number);

const players: Player[] = rosterEntries
  .map((entry) => ({
    ...positionProfiles[entry.position],
    ...entry,
    detail: playerIntroductions[entry.name] ?? positionProfiles[entry.position].detail,
  }))
  .sort(comparePlayersByNumber);

const pitchMetrics = [
  ["球速", "163 km/h"],
  ["スタミナ", "B 72"],
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
