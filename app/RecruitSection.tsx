"use client";

import { type FormEvent, useState } from "react";

const recruitment = ["選手・マネージャ・コーチ", "練習試合", "スポンサー", "メディア"];
const contactEmail = "founders240309@gmail.com";

export function RecruitSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(recruitment[0]);

  const toggleForm = (topic: string) => {
    if (isFormOpen && selectedTopic === topic) {
      setIsFormOpen(false);
      return;
    }

    setSelectedTopic(topic);
    setIsFormOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim() || "未入力";
    const contact = String(formData.get("contact") ?? "").trim() || "未入力";
    const message = String(formData.get("message") ?? "").trim() || "未入力";
    const subject = `FOUNDERS お問い合わせ / ${selectedTopic}`;
    const body = [
      `種別: ${selectedTopic}`,
      `名前: ${name}`,
      `メールまたはXアカウント: ${contact}`,
      "",
      "内容:",
      message,
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="recruitBand" id="recruit">
      <div>
        <h2 className="joinTitle">Founders Wanted!!</h2>
      </div>
      <div className="recruitContent">
        <div className="recruitGrid">
          {recruitment.map((item) => (
            <button
              aria-controls="recruit-contact-form"
              aria-expanded={isFormOpen && selectedTopic === item}
              className="recruitItem"
              key={item}
              onClick={() => toggleForm(item)}
              type="button"
            >
              <span>{item}</span>
              <strong>{isFormOpen && selectedTopic === item ? "Close" : "Entry"}</strong>
            </button>
          ))}
        </div>

        <div className="contactPanel" data-open={isFormOpen}>
          <form aria-hidden={!isFormOpen} className="contactForm" id="recruit-contact-form" onSubmit={handleSubmit}>
            <div className="formHeader">
              <span>{selectedTopic}</span>
              <strong>Contact Form</strong>
              <button aria-label="閉じる" className="formClose" onClick={() => setIsFormOpen(false)} type="button">
                ×
              </button>
            </div>
            <label>
              名前
              <input name="name" placeholder="山田 太郎" type="text" />
            </label>
            <label>
              メールまたはXアカウント
              <input name="contact" placeholder="example@mail.com / @account" type="text" />
            </label>
            <label>
              内容
              <textarea name="message" placeholder="参加希望、練習試合、スポンサー相談、取材依頼など" rows={4} />
            </label>
            <button className="formButton" type="submit">
              メールを送信
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
