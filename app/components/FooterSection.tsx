import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import type { Footer } from "@/lib/types";

export default function FooterSection({ footer }: { footer: Footer }) {
  return (
    <footer className="bg-[var(--mm-blue)] text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-extrabold mb-6">{footer.brand}</h2>
          <p className="text-sm font-semibold mb-3">Contact Us</p>
          <p className="flex items-center gap-2 text-sm text-blue-50 mb-3">
            <WhatsAppIcon sx={{ fontSize: 18 }} />
            <span>
              Whats App
              <br />
              {footer.contact.whatsApp}
            </span>
          </p>
          <p className="flex items-center gap-2 text-sm text-blue-50">
            <CallIcon sx={{ fontSize: 18 }} />
            <span>
              Call Us
              <br />
              {footer.contact.call}
            </span>
          </p>
          <p className="text-sm font-semibold mt-6 mb-3">Download App</p>
          <div className="flex gap-3">
            <span className="bg-black/80 rounded-md px-4 py-2 text-xs">
               App Store
            </span>
            <span className="bg-black/80 rounded-md px-4 py-2 text-xs">
              ▶ Google Play
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-5 border-b border-white/30 pb-2 inline-block">
            Most Popular Categories
          </h3>
          <ul className="space-y-3 text-sm text-blue-50">
            {footer.popularCategories.map((c) => (
              <li key={c} className="hover:text-white cursor-pointer">
                • {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-5 border-b border-white/30 pb-2 inline-block">
            Customer Services
          </h3>
          <ul className="space-y-3 text-sm text-blue-50">
            {footer.customerServices.map((c) => (
              <li key={c} className="hover:text-white cursor-pointer">
                • {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20">
        <p className="max-w-7xl mx-auto px-4 py-5 text-center text-sm text-blue-50">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
