export const metadata = {
  title: "Contact | Speedoodle 🚀",
  description: "Get in touch with the Speedoodle team.",
};

export default function ContactPage() {
  return (
    <div>
      <h1>Contact</h1>
      <p>We’d love to hear from you.</p>
      <form action="mailto:hello@speedoodle.com" method="post" encType="text/plain" className="info-card">
        <label>
          Full name
          <input name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Message
          <textarea name="message" rows={5} required></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
      <p>You can switch to a form service later (e.g., Formspree).</p>
    </div>
  );
}
