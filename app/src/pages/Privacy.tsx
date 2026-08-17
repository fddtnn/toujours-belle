import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../sections/Footer';

export default function Privacy() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ backgroundColor: 'var(--tb-card)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--tb-bg)', padding: '120px 24px 60px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
            {lang === 'fr' ? 'Politique de Confidentialité' : 'سياسة الخصوصية'}
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--tb-text-muted)' }}>
            www.toujours-belle.com
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16" style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.8, color: '#4a4a4a' }}>
        <div className="space-y-8">
          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Why you should read this policy
            </h2>
            <p>
              We take the privacy of visitors to our Website (you) very seriously. Please read this privacy policy (Policy) carefully as it contains important information about how your personal data will be used.
            </p>
            <p className="mt-3">
              For the purposes of the General Data Protection Regulation and all other relevant legislation, Toujours Belle ('we' or 'us') is the 'data controller' (i.e. the company who is responsible for, and controls the processing of, your personal data).
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              How to contact us
            </h2>
            <p>
              Any enquiries relating to our policy on data protection or indeed the contents of this policy are welcome and should be addressed to The Data Protection Officer using the following means:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>By email: contact@toujours-belle.com</li>
              <li>By post: The Data Protection Officer, Toujours Belle, Tunis, Tunisia.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Personal data we may collect about you
            </h2>
            <h3 style={{ fontWeight: 600, color: 'var(--tb-text)', marginBottom: '8px', marginTop: '16px' }}>Information that you provide</h3>
            <p>
              Personal information about you (such as your name, email address, phone number, address) will be obtained, whenever you complete forms on the Website – in particular, when you complete an order.
            </p>
            <p className="mt-3">
              We will also obtain personal information you provide when you send feedback, post material, contact us for any reason and by any medium, sign up to a service, make purchases through the website, share information via the Website's social media functions, enter a competition, complete a survey or report a problem with the Website.
            </p>

            <h3 style={{ fontWeight: 600, color: 'var(--tb-text)', marginBottom: '8px', marginTop: '16px' }}>Personal Information about other individuals</h3>
            <p>
              If you give us information on behalf of someone else, you confirm that the other person has appointed you to act on his/her behalf and has agreed that you can give consent on his/her behalf to the processing of his/her data.
            </p>

            <h3 style={{ fontWeight: 600, color: 'var(--tb-text)', marginBottom: '8px', marginTop: '16px' }}>Information that will be collected automatically</h3>
            <p>
              <strong>Cookies:</strong> We may monitor your use of the Website through the use of cookies and similar tracking devices. For example, we may monitor how many times you use the Website, which pages you go to and traffic data. This information helps to build a profile of users to the Website. Some of this data will be aggregated or statistical, which means that we will not be able to identify you individually.
            </p>
            <p className="mt-3">
              <strong>Device information:</strong> We may also collect information about your device each time you use the Website. For example, we may collect information on the type of mobile device that you are using and its unique device identifier, the type of mobile browser that you are using, the mobile operating system that you are using, mobile network information and the time zone setting.
            </p>
            <p className="mt-3">
              <strong>Location data:</strong> We may also collect information to determine your location using GPS technology or such other location tracking software we may use from time to time.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              How your personal data will be used
            </h2>
            <p>We will use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>To help identify you and any accounts you hold with Toujours Belle;</li>
              <li>Billing and order fulfilment for purchases made through the Website;</li>
              <li>Administration;</li>
              <li>Research, statistical analysis and behavioural analysis;</li>
              <li>Customer profiling and analysing your purchasing preferences;</li>
              <li>Marketing—see 'Marketing and opting out', below;</li>
              <li>Fraud prevention and detection;</li>
              <li>Customising the Website and its content to your particular preferences;</li>
              <li>To notify you of any changes to the Website or to our services or products that may affect you;</li>
              <li>Improving our services and products.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Marketing and opting out
            </h2>
            <p>
              If you have provided your consent to receive news, special offers or promotions from us, we may contact you by text message or email, about products, services, promotions, special offers and charitable causes that may be of interest to you.
            </p>
            <p className="mt-3">
              The Website may contain links to other websites or apps which we or our partners own, or websites or apps of our partners or third parties. Please note that if you follow any of these links, the websites, apps and services provided through them will have their own privacy policies/terms of use. We do not accept any responsibility or liability for their respective privacy policies/terms of use or the collection and use of any personal data collected through these websites, apps or services.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Disclosure of your personal data
            </h2>
            <p>We may disclose your personal data to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Other companies that become part of a group with Toujours Belle;</li>
              <li>A third party who acquires Toujours Belle or acquires substantially all of its assets, in which case the personal data shall be one of the acquired assets;</li>
              <li>Our agents and service providers;</li>
              <li>Law enforcement and regulatory agencies in connection with any investigation to help prevent unlawful activity or as otherwise required by applicable law;</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Keeping your data secure
            </h2>
            <p>
              We will use technical and organisational measures to safeguard your personal data, for example:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Utilising an encryption and authentication process to protect our online services. This process ensures that information is scrambled before it is transmitted so that it remains private even if it is intercepted.</li>
              <li>We may also store manual copies of your personal information in a secure facility where access is restricted.</li>
              <li>Where we have given you (or where you have chosen) a password which enables you to access certain parts of our website, you are responsible for keeping this password confidential. We ask you not to share a password with anyone.</li>
            </ul>
            <p className="mt-3">
              While we will use all reasonable efforts to safeguard your personal data, you acknowledge that the use of the internet is not entirely secure and for this reason we cannot guarantee the security or integrity of any personal data that are transferred from you or to you via the internet.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Your Consent and Rights of Access
            </h2>
            <p>
              We will collect and store information about you with your consent, as detailed above. You provide us with your consent by choosing to provide your personal details when you contact us, completing our forms on our website and when you use our service and by reading and agreeing to this Privacy Policy.
            </p>
            <p className="mt-3">You can change your mind or remove or add your consent at any time. You have the right of access to your personal records or other information that we hold about you. There is no administrative charge for this service.</p>
            <p className="mt-3">You have the right to rectify any errors in the data we hold about you. If any data or information we hold about you is inaccurate, or out of date, please contact us and we will correct this immediately.</p>
            <p className="mt-3">You have the right to have the data we hold about you erased.</p>
            <p className="mt-3">You have the right to ask us to stop processing your personal data for direct marketing purposes.</p>
            <p className="mt-3">You have the right to data portability. If you wish to obtain your data for your own purposes across different services, we will provide this information to you in a CSV file. There is no administrative charge for this service.</p>
            <p className="mt-3">To revise your consent, access, amend or remove your records or assert any of your rights set out above, you should send your request in writing to us at contact@toujours-belle.com.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              How long we will store your data
            </h2>
            <p>
              We will store your data for as long as necessary for the purpose of processing. The data may be deleted in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>You have withdrawn your consent to data processing</li>
              <li>The original purpose for processing the data is no longer relevant or cannot be performed any more.</li>
              <li>The data is no longer up to date or accurate.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Children
            </h2>
            <p>
              Toujours Belle only offers services to individuals over the age of 18. In using our services, you confirm that you have read and consented to this Policy and verify that you are over the age of 18.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Use of cookies
            </h2>
            <p>
              A cookie is a small text file which is placed onto your mobile (or other electronic device) when you access the Website. We use cookies and other online tracking devices on the Website to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Keep track of the items stored in your shopping basket and take you through the checkout process;</li>
              <li>Recognise you whenever you visit the Website (this speeds up your access to the Website as you do not have to log on each time);</li>
              <li>Obtain information about your preferences, online movements and use of the internet;</li>
              <li>Carry out research and statistical analysis to help improve the Website content, products and services and to help us better understand our visitor and customer requirements and interests;</li>
              <li>Target our marketing and advertising campaigns and those of our partners more effectively by providing interest-based advertisements that are personalised to your interests; and</li>
              <li>Make your online experience more efficient and enjoyable.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Changes to this privacy policy
            </h2>
            <p>
              We may change this Policy from time to time. You should check this policy frequently to ensure you are aware of the most recent version that will apply each time you use the Website.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 500, color: 'var(--tb-text)', marginBottom: '12px' }}>
              Data Protection Supervisory Authority
            </h2>
            <p>
              The Data Protection Supervisory Authority is the Information Commissioners Office. Should you have any complaints about the way we handle your data, you may direct them to the ICO. More information on the ICO can be found on their website here: <a href="https://toujours-belle.com" className="underline hover:text-[#d4a5a5]" style={{ color: '#c8adad' }}>toujours-belle.com</a>
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-6" style={{ borderTop: '1px solid var(--tb-border)' }}>
          <button
            onClick={() => navigate('/')}
            className="text-sm hover:text-[#d4a5a5] transition-colors duration-300"
            style={{ fontFamily: "'Inter', sans-serif", color: 'var(--tb-text-muted)', textDecoration: 'underline' }}
          >
            {lang === 'fr' ? "← Retour à l'accueil" : 'العودة إلى الرئيسية →'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
