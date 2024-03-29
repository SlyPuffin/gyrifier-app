import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useFetchUser } from "@/auth/user";

export function Navbar(props) {
  const { authUser, isAuthUserLoading } = useFetchUser();
  const [menuShown, setMenuShown] = useState(true);

  const changeTheme = useCallback((theme) => {
    props.changeTheme(theme);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuShown(!menuShown);
  }, [menuShown]);

  return (
    <nav className="sticky top-0 z-40 bg-skin-secondary px-2 py-2.5 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center justify-between">
          <Link href="/">
            <a id="logo" className="flex">
              <svg
                className="h-10 w-10 fill-skin-logo"
                viewBox="0 0 1121 1201"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M663.5 3.5C655.167 4.5 645.333 6.33333 634 9C622.667 11.6667 612 14.8333 602 18.5C592 22.1667 582.667 26.1667 574 30.5C565.333 34.8333 553.5 42.3333 538.5 53C523.5 63.6667 510.667 74.5 500 85.5C489.333 96.5 479.5 108.5 470.5 121.5C461.5 134.5 454.833 145.333 450.5 154C446.167 162.667 442.167 172 438.5 182C434.833 192 431.667 202.667 429 214C426.333 225.333 424.5 235.167 423.5 243.5C422.5 251.833 422.167 264.833 422.5 282.5C422.833 300.167 423.833 313.833 425.5 323.5C427.167 333.167 429.667 343.667 433 355C436.333 366.333 441 378.5 447 391.5C453 404.5 458 414.167 462 420.5C466 426.833 477.333 427.333 496 422C514.667 416.667 533.167 412.667 551.5 410C569.833 407.333 579.167 405.667 579.5 405C579.833 404.333 576.5 400.5 569.5 393.5C562.5 386.5 556.333 378.833 551 370.5C545.667 362.167 540.833 352.5 536.5 341.5C532.167 330.5 529.333 321.167 528 313.5C527.333 309.667 526.667 305.833 526 302C556.333 302 586.667 302 617 302C677.667 302 710.167 301.5 714.5 300.5C718.833 299.5 724.5 297.167 731.5 293.5C738.5 289.833 744.167 286 748.5 282C752.833 278 757 272.667 761 266C765 259.333 767.833 253 769.5 247C771.167 241 771.833 233.5 771.5 224.5C771.167 215.5 770.333 208.833 769 204.5C767.667 200.167 765.5 195.333 762.5 190C759.5 184.667 756 179.833 752 175.5C748 171.167 744.333 167.833 741 165.5C737.667 163.167 733.5 160.833 728.5 158.5C723.5 156.167 718.833 154.5 714.5 153.5C710.167 152.5 704.333 152 697 152C689.667 152 683.833 152.5 679.5 153.5C675.167 154.5 670.5 156.167 665.5 158.5C660.5 160.833 655 164.5 649 169.5C643 174.5 638.333 179.5 635 184.5C631.667 189.5 629.5 193.667 628.5 197C627.5 200.333 612.5 202 583.5 202C569 202 554.5 202 540 202C542.667 197.167 545.333 192.333 548 187.5C553.333 177.833 560.667 168 570 158C579.333 148 588.833 139.667 598.5 133C608.167 126.333 618.667 120.667 630 116C641.333 111.333 651.833 108 661.5 106C671.167 104 683.667 103 699 103C714.333 103 729.5 104.5 744.5 107.5C759.5 110.5 772.5 114.333 783.5 119C794.5 123.667 804.667 129.333 814 136C823.333 142.667 831.167 149.5 837.5 156.5C843.833 163.5 849.667 172 855 182C860.333 192 864.333 202.667 867 214C869.667 225.333 871 238 871 252C871 266 869.667 279.167 867 291.5C864.333 303.833 860.833 314.833 856.5 324.5C852.167 334.167 847 343.333 841 352C835 360.667 827.167 369.5 817.5 378.5C807.833 387.5 795 396.667 779 406C763 415.333 760 429.333 770 448C780 466.667 787 481.333 791 492C795 502.667 799.5 518.167 804.5 538.5C809.5 558.833 813.333 579.333 816 600C818.667 620.667 820.333 642.5 821 665.5C821.667 688.5 821.167 707.833 819.5 723.5C817.833 739.167 814.667 754.833 810 770.5C805.333 786.167 799.667 800 793 812C786.333 824 780 833.667 774 841C768 848.333 761 855.667 753 863C745 870.333 736.5 877.167 727.5 883.5C718.5 889.833 708 896.167 696 902.5C684 908.833 668 915.5 648 922.5C628 929.5 605.833 935.333 581.5 940C557.167 944.667 532.667 947.833 508 949.5C483.333 951.167 462.5 951.833 445.5 951.5C428.5 951.167 412.667 950.333 398 949C383.333 947.667 359.333 944.167 326 938.5C292.667 932.833 261.167 926.167 231.5 918.5C216.667 914.667 201.833 910.833 187 907C188.333 902.5 189.667 898 191 893.5C193.667 884.5 197.667 873.5 203 860.5C208.333 847.5 213.833 835.167 219.5 823.5C225.167 811.833 232 799.167 240 785.5C248 771.833 256.333 758.833 265 746.5C273.667 734.167 282.167 723 290.5 713C298.833 703 311.333 690 328 674C344.667 658 357.833 646.333 367.5 639C377.167 631.667 387.833 624.333 399.5 617C411.167 609.667 422.167 603.333 432.5 598C442.833 592.667 454.167 587.5 466.5 582.5C478.833 577.5 495 572.333 515 567C535 561.667 550.667 558.167 562 556.5C573.333 554.833 586.167 553.667 600.5 553C614.833 552.333 622 535.333 622 502C622 485.333 622 468.667 622 452C617.333 452 612.667 452 608 452C598.667 452 586 452.833 570 454.5C554 456.167 534.833 459.5 512.5 464.5C490.167 469.5 467.167 476.5 443.5 485.5C419.833 494.5 401 502.667 387 510C373 517.333 359.5 525.167 346.5 533.5C333.5 541.833 317.667 553.5 299 568.5C280.333 583.5 262.167 600.167 244.5 618.5C226.833 636.833 209.833 657 193.5 679C177.167 701 161.833 724.833 147.5 750.5C133.167 776.167 122.667 796.667 116 812C109.333 827.333 103.833 841.5 99.5 854.5C95.1667 867.5 92.6667 874.167 92 874.5C91.3333 874.833 82.8333 872 66.5 866C50.1667 860 35.3333 871.667 22 901C8.66667 930.333 2 945.5 2 946.5C2 947.5 2.66667 948.333 4 949C5.33333 949.667 18.1667 954.667 42.5 964C66.8333 973.333 93 982.5 121 991.5C149 1000.5 174.333 1008 197 1014C219.667 1020 241.167 1025.17 261.5 1029.5C281.833 1033.83 301.333 1037.5 320 1040.5C338.667 1043.5 358 1046 378 1048C398 1050 416.833 1051.17 434.5 1051.5C443.333 1051.67 452.167 1051.83 461 1052C458.5 1058 456 1064 453.5 1070C448.5 1082 442 1095 434 1109C426 1123 422 1142 422 1166C422 1178 422 1190 422 1202C472 1202 522 1202 572 1202C622 1202 672 1202 722 1202C722 1185.33 722 1168.67 722 1152C722 1135.33 722 1118.67 722 1102C693 1102 664 1102 635 1102C606 1102 577 1102 548 1102C549.833 1097.33 551.667 1092.67 553.5 1088C557.167 1078.67 560.333 1069.17 563 1059.5C565.667 1049.83 575.667 1043.5 593 1040.5C610.333 1037.5 626.167 1034.17 640.5 1030.5C654.833 1026.83 669.167 1022.5 683.5 1017.5C697.833 1012.5 709.833 1007.83 719.5 1003.5C729.167 999.167 739.667 993.833 751 987.5C762.333 981.167 773.833 973.833 785.5 965.5C797.167 957.167 808.5 947.833 819.5 937.5C830.5 927.167 839.833 917.333 847.5 908C855.167 898.667 863.167 887.333 871.5 874C879.833 860.667 887.167 846.667 893.5 832C899.833 817.333 905.333 801 910 783C914.667 765 917.833 748.833 919.5 734.5C921.167 720.167 922 702.667 922 682C922 661.333 920.667 637.5 918 610.5C915.333 583.5 911.5 558.833 906.5 536.5C901.5 514.167 895.833 494.5 889.5 477.5C883.167 460.5 886.167 446 898.5 434C910.833 422 920 411.833 926 403.5C932 395.167 936.5 388.167 939.5 382.5C942.5 376.833 973.667 362.167 1033 338.5C1092.33 314.833 1121.5 299.5 1120.5 292.5C1119.5 285.5 1117.17 275.833 1113.5 263.5C1109.83 251.167 1104 236.333 1096 219C1088 201.667 1078.5 185.167 1067.5 169.5C1056.5 153.833 1046.5 141.5 1037.5 132.5C1028.5 123.5 1020.83 116.5 1014.5 111.5C1008.17 106.5 1000.17 101 990.5 95C980.833 89 971.333 83.8333 962 79.5C952.667 75.1667 941 70.8333 927 66.5C913 62.1667 900.833 59.1667 890.5 57.5C880.167 55.8333 870.833 52.1667 862.5 46.5C854.167 40.8333 842 34.5 826 27.5C810 20.5 797 15.6667 787 13C777 10.3333 765.667 8 753 6C740.333 4 724.333 2.83333 705 2.5C685.667 2.16667 671.833 2.5 663.5 3.5Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="self-center whitespace-nowrap pl-5 pr-5 text-lg font-semibold text-skin-secondary">
                Gyrifier
              </span>
            </a>
          </Link>
          {!isAuthUserLoading &&
            (authUser ? (
              <Link href="/api/logout">
                <a className="block border-b py-2 pr-4 pl-3 text-skin-secondary  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-skin-muted">
                  Logout
                </a>
              </Link>
            ) : (
              <Link href="/api/login">
                <a className="block border-b py-2 pr-4 pl-3 text-skin-secondary  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-skin-muted">
                  Login
                </a>
              </Link>
            ))}
        </div>

        <div id="menubutton" className="flex items-center md:hidden">
          <button
            onClick={toggleMenu}
            className="mobile-menu-button outline-none"
          >
            <svg
              className="h-6 w-6 stroke-skin-logo"
              x-show="!showMenu"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div
          id="menuitems"
          className={`${
            menuShown ? "hidden" : ""
          } h-screen w-full md:block md:h-auto md:w-auto`}
        >
          <ul className="mt-4 flex w-full flex-col items-center md:mt-0 md:w-auto md:flex-row md:space-x-8 md:text-sm md:font-medium">
            <Link href="/">
              <a
                className=" mb-2 w-full rounded border border-skin-secondary py-2 pr-4 pl-4 text-center text-skin-secondary hover:bg-skin-contrast hover:text-skin-contrast md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-skin-muted  "
                aria-current="page"
              >
                Home
              </a>
            </Link>
            <Link href="/decks">
              <a className=" mb-2 w-full rounded border border-skin-secondary py-2 pr-4 pl-4 text-center text-skin-secondary hover:bg-skin-contrast hover:text-skin-contrast md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-skin-muted  ">
                Decks
              </a>
            </Link>
            <div
              id="themeselect"
              className="mb-2 w-full text-skin-secondary md:hover:text-skin-muted"
            >
              <label htmlFor="theme">
                <select
                  name="theme"
                  id="theme"
                  className="form-select m-0 flex w-full appearance-none rounded border border-solid border-skin-secondary bg-skin-secondary py-2 pr-4 pl-4 text-center font-normal text-skin-secondary outline-none transition ease-in-out hover:bg-skin-contrast hover:text-skin-contrast md:w-auto"
                  onChange={(e) => changeTheme(e.target.value)}
                >
                  <optgroup label="Color Scheme">
                    <option selected disabled hidden>
                      Theme
                    </option>
                    <option value="easter">Easter</option>
                    <option value="classic">Default</option>
                    <option value="quirky">Quirky</option>
                  </optgroup>
                </select>
              </label>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
