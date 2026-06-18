/* eslint-disable @next/next/no-img-element */

import { PlayersSection } from "./PlayersSection";
import { NewsSection } from "./NewsSection";
import { RecruitSection } from "./RecruitSection";
import { XTimeline } from "./XTimeline";

const heroSlides = [
  {
    label: "Game Day",
    src: "/hero-slide-game-day.jpg",
    tone: "slideOne",
  },
  {
    label: "Practice",
    src: "/hero-slide-practice.jpg",
    tone: "slideTwo",
  },
  {
    label: "Team Spirit",
    src: "/hero-slide-team-spirit.jpg",
    tone: "slideThree",
  },
];

const sponsors = ["GOLD PARTNER", "BLACK PARTNER", "LOCAL SUPPORTER"];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="heroSlides" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <figure className={`heroSlide ${slide.tone}`} key={slide.label}>
              <img
                alt=""
                className="heroImage"
                src={slide.src}
              />
              <figcaption>
                {String(index + 1).padStart(2, "0")} / {slide.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="heroShade" />

        <header className="siteHeader">
          <a className="brand" href="#top" aria-label="トップへ戻る">
            <span className="brandMark">BT</span>
            <span>
              <strong>BASEBALL TEAM</strong>
              <small>Official Landing Page</small>
            </span>
          </a>

          <nav aria-label="メインナビゲーション" className="topNav">
            <a href="#news">News</a>
            <a href="#players">Players</a>
            <a href="#recruit">Contact</a>
            <a href="#sponsor">Sponsor</a>
          </nav>
        </header>

        <div className="heroContent">
          <h1 aria-label="PLAY BOLD" className="sloganTitle" data-shadow="PLAY BOLD">
            <span>PLAY</span>
            <span>BOLD</span>
          </h1>
          <div className="heroActions">
            <a className="primaryAction heroCta" href="#players">
              選手を見る
            </a>
            <a className="secondaryAction heroCta" href="#recruit">
              問い合わせる
            </a>
          </div>
        </div>
      </section>

      <section className="introBand" id="about">
        <div className="sectionKicker">
          <h2>
            <span>起業家とVCが、</span>
            <span>本気で野球をする。</span>
          </h2>
        </div>
        <div className="introCopy">
          <p>
            創設の思い、チームが大切にしている姿勢、地域とのつながりをここに入れます。
            勝敗だけではなく、仲間と野球を続ける理由や、グラウンドに集まる空気を言葉で伝える場所です。
          </p>
          <p>
            PLAY BOLDというスローガンのもと、一人ひとりが大胆に挑戦できるチームを目指しています。
            初めて参加する人にも伝わるように、活動の背景やこれからの目標を丁寧に書いていきます。
          </p>
        </div>
      </section>

      <NewsSection />

      <PlayersSection />

      <section className="socialBand" id="x-feed">
        <div className="xCard">
          <div>
            <p className="sectionLabel">X Updates</p>
            <h2>@Founders311551 の最新情報</h2>
            <p>
              試合予定、練習風景、募集情報を公式Xで発信しています。
              直近の動きはここからチェックできます。
            </p>
          </div>
          <div className="xFrame">
            <XTimeline />
            <a className="xButton" href="https://x.com/Founders311551" rel="noreferrer" target="_blank">
              Xを見る
            </a>
          </div>
        </div>
      </section>

      <RecruitSection />

      <section className="sponsorBand" id="sponsor">
        <div className="sectionHeader">
          <p className="sectionLabel">Sponsor</p>
          <h2>チームを支えるパートナー</h2>
        </div>
        <div className="sponsorGrid">
          {sponsors.map((sponsor) => (
            <div className="sponsorSlot" key={sponsor}>
              {sponsor}
            </div>
          ))}
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="footerBrand">
          <span className="brandMark">BT</span>
          <div>
            <strong>BASEBALL TEAM</strong>
            <small>PLAY BOLD</small>
          </div>
        </div>
        <p className="footerCopy">© 2026 Baseball Team. All rights reserved.</p>
      </footer>
    </main>
  );
}
