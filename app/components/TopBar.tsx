import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

export default function TopBar() {
  return (
    <div className="bg-slate-100 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
        <span>Welcome to worldwide Megamart!</span>
        <div className="hidden sm:flex items-center gap-6">
          <span className="flex items-center gap-1">
            <LocationOnOutlinedIcon sx={{ fontSize: 16 }} /> Deliver to 423651
          </span>
          <span className="flex items-center gap-1">
            <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} /> Track your order
          </span>
          <span className="flex items-center gap-1">
            <LocalOfferOutlinedIcon sx={{ fontSize: 16 }} /> All Offers
          </span>
        </div>
      </div>
    </div>
  );
}
