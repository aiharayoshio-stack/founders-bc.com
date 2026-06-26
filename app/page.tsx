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

const sponsors = [
  {
    name: "Partners Fund",
    src: "/partner-fund-logo.png",
  },
  {
    name: "BuyerX",
    src: "/buyerx-logo.png",
  },
];

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
          <a className="brand" href="#top" aria-label="FOUNDERS トップへ戻る">
            <img className="brandLogo" src="/founders-boxlogo.png" alt="FOUNDERS" width="86" height="86" />
          </a>

          <nav aria-label="メインナビゲーション" className="topNav">
            <a href="#news">NEWS</a>
            <a href="#players">PLAYERS</a>
            <a href="#recruit">CONTACT</a>
            <a href="#sponsor">SPONSOR</a>
          </nav>
        </header>

        <div className="heroContent">
          <h1 aria-label="PLAY BOLD" className="sloganTitle">
            <img className="playBoldLogo" src="/playbold-logo.png?v=20260623" alt="PLAY BOLD" width="983" height="662" />
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
            三軒茶屋で毎月1回のキャッチボール会。その熱量が溢れ出して、2024年、FOUNDERSは動き出しました。
          </p>
          <p>
            駅伝の関東学生連合のように、スタートアップ・VC各社の代表が集った寄せ集めチーム。飛び込んだのは、IT系上場企業の強豪が揃い、なぜか元プロまでいるハイレベルなリーグでした。初戦はノーヒットノーラン、2戦目は10点差を超える大敗からの船出。悔しさをばねにチーム作りに奔走し、2年目にはリーグ優勝。平日は事業で挑み、週末は野球で倒す——IT企業のジャイアントキリングを、オンもオフも積み重ねていきます。
          </p>
          <p>
            起業もVC投資もマラソンのような長い挑戦。だからこそ、毎週末に勝敗が付いて一喜一憂できる野球は、最高の息抜きであり活力になります。グラウンドでは仲間、それぞれのフィールドでは戦友——スタートアップの野球仲間を広く巻き込み、支え合えるコミュニティを育てていきます。
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
            <div className="sponsorSlot" key={sponsor.name}>
              <img className="sponsorLogo" src={sponsor.src} alt={sponsor.name} />
            </div>
          ))}
        </div>
      </section>

      <p className="siteCopyright">© FOUNDERS Baseball Club. All rights reserved.</p>
    </main>
  );
}
