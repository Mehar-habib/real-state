import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe6Pd3aSSst785RwZxnd4Q6bbwpxJKJBzIUA&s"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="w-4 h-4 text-green-700 " />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-sm">
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : " Bed"}
            </div>
            <div className="font-bold text-sm">
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "Bath"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
