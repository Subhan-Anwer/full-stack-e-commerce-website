import { COUPON_CODES } from "@/sanity/lib/sale/couponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sale/getActiveSaleByCouponCode";

const BlackFridayBanner = async () => {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY50);

  if (!sale?.isActive) {
    console.log("Sale is not active")
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-[8px] shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">{sale.title}</h2>
          <p className="text-left text-xl sm:text-3xl font-semibold mb-6">{sale.description}</p>

          <div className="flex">
            <div className="bg-white flex text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <p className="text-base sm:text-xl">
                Use code:{" "}
                <span className="font-bold underline text-red-600">{sale.couponCode}</span>
              </p>
              <p className="ml-2 text-base sm:text-xl">
                for {sale.discountAmount}% off
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayBanner;
