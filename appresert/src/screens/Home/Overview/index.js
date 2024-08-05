import React, { useState } from "react";
import cn from "classnames";
import useDarkMode from "@fisch0920/use-dark-mode";
import styles from "./Overview.module.sass";
import Item from "./Item";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Users from "../../../components/Users";
import Chart from "./Chart";
import Slider from "react-slick";
import Icon from "../../../components/Icon";

// data
import { products } from "../../../mocks/products";
import { User } from "../../../Constants";
import { useTranslation } from "react-i18next";

const intervals = ["All time", "In a year", "Per month"];

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
    <button {...props}>{children}</button>
);

const settings = {
    infinite: true,
    slidesToShow:  1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-right" size="24" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-left" size="24" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow:  1,
        },
      },
    ],
  };

const Overview = ({ className }) => {
    const darkMode = useDarkMode(false);
    const {t} = useTranslation()
    const [sorting, setSorting] = useState(intervals[0]);
    const [activeIndex, setActiveIndex] = useState(0);
   
    const nav = [
        {
            title: User.typeUser ===User.admin ? t("navigation.customers") : t("views.home.order_number"),
            counter: "1024",
            icon: User.typeUser ===User.admin ? "profile-circle" : "basket",
            color: "#F2D45F",
            value: -37.8,
        },
        {
            title: User.typeUser === User.admin ? t("navigation.income") : t("views.home.reservations_number"),
            counter: "256k",
            icon: User.typeUser ===User.admin ? "activity" : "store",
            color: darkMode.value ? "#33383F" : "#9A9FA5",
            value: 37.8,
        },
    ];

    return (
        <Card className={cn(styles.card, className)} title={t("views.home.overview")}  classTitle="title-red"
            head={
                <Dropdown className={styles.dropdown}  classDropdownHead={styles.dropdownHead}  value={sorting} setValue={setSorting} options={intervals}  small/>
            }
        >
            <div className={styles.overview}>
                <div className={styles.nav}>
                    {nav.map((x, index) => (
                        <Item
                            className={cn(styles.item, {
                                [styles.active]: index === activeIndex,
                            })}
                            key={index}
                            onActive={() => setActiveIndex(index)}
                            item={x}
                            typeUser
                        />
                    ))}
                </div>
                <div className={styles.body}>
                    {User.typeUser === User.admin ? (
                        <>
                            {activeIndex === 0 && <Users />}
                            {activeIndex === 1 && <Chart />}
                        </>
                    ) : (
                        <div className={cn("slider-container", styles.wrapper)}>
                          <Slider className={cn("products-slider products-sliderPub")} {...settings}>
                            {products.map((x, index) => (
                                <div className={cn(styles.product, styles.active )} key={index}>
                                    <div className={styles.preview}>
                                        <img srcSet={`${x.image2x} 2x`} src={x.image} alt="Product" />
                                    </div>
                                    <div className={styles.line}>
                                        <div className={styles.title}>{x.product}</div>
                                        {x.price > 0 ? (
                                            <div className={styles.price}>${x.price}</div>
                                        ) : (
                                            <div className={styles.empty}>${x.price}</div>
                                        )}
                                    </div>
                                    {/*released ? (
                                        <div className={styles.date}>
                                        <Icon name="clock" size="24" /> {x.date}
                                        </div>
                                    }) : */}
                                </div>
                            ))}
                          </Slider>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default Overview;
