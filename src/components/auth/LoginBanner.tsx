
import Image from "next/image";
import { Card } from "../ui/Card";
import teaGardenHero from "../../assets/images/tea-garden-hero.png";

export function LoginBanner() {
  return (
    <div
      className="relative hidden h-full w-full overflow-hidden bg-[#F4F3ED] lg:block"
      aria-hidden="true"
    >
      <Image
        src={teaGardenHero}
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* Floating glassmorphic quote card, overlaid on the bottom-left
          of the hero image */}
      <Card className="absolute bottom-8 left-6 max-w-sm">
        <p className="text-sm leading-relaxed text-gray-700">
          &ldquo;Sign in to explore our product range, manage your private
          label solutions, and grow your brand with Avenrich Tea.&rdquo;
        </p>
      </Card>
    </div>
  );
}

// import Image from "next/image";
// import { Card } from "../ui/Card";
// import teaGardenHero from "../../assets/images/tea-garden-hero.png";

// export function LoginBanner() {
//   return (
//     <div
//       className="relative hidden h-full w-full overflow-hidden bg-[#F4F3ED] lg:block"
//       aria-hidden="true"
//     >
//       <Image
//         src={teaGardenHero}
//         alt=""
//         fill
//         priority
//         sizes="50vw"
//         className="object-cover"
//       />

//       {/* Floating glassmorphic quote card, overlaid on the bottom-left
//           of the hero image */}
//       <Card className="absolute bottom-8 left-6 max-w-sm">
//         <p className="text-sm leading-relaxed text-gray-700">
//           &ldquo;Sign in to explore our product range, manage your private
//           label solutions, and grow your brand with Avenrich Tea.&rdquo;
//         </p>
//       </Card>
//     </div>
//   );
// }