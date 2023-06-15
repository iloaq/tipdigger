import React, { useState, useContext } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./NewsPage.module.scss";
import {
  Avatar,
  Button,
  Checkbox,
  Header,
  MaskedTextField,
  ShadowBox,
  TextField,
} from "../../components";
import purse from "../../assets/images/purse.png";
import { ReactComponent as ConditionalIcon } from "./icons/conditions.svg";
import { useAppSelector } from "../../hooks/redux";
import { selectUserData } from "../../store/user/userSlice";
import { ThemeContext } from "../../ThemeContext";

export const NewsPage = () => {
  const [isPhotos, setIsPhotos] = useState(true);

  const userData = useAppSelector(selectUserData);

  const switchHandler = (value: boolean) => {
    setIsPhotos(value);
  };

  const theme = useContext(ThemeContext);

  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <div className={`${styles.newsPage} ${themeClass}`}>
      <Header />
      <ShadowBox className={`${styles.ShadowBox} ${themeClass}`}>
      {userData && (
            <div className={`${styles.info} ${themeClass}`}>
              <div className={`${styles.profile} ${themeClass}`}>
                <Avatar className={`${styles.avatar} ${themeClass}`} />
                <span>{`${userData.firstName} ${userData.lastName}`}</span>
              </div>
            </div>
      )}
      <div className={`${styles.toggler} ${themeClass}`}>
        <button
          className={cn(styles.togglerItem, themeClass, {
            [styles.active]: isPhotos,
          })}
          onClick={() => switchHandler(true)}
        >
          Photos
        </button>
        <button
          className={cn(styles.togglerItem, themeClass, {
            [styles.active]: !isPhotos,
          })}
          onClick={() => switchHandler(false)}
        >
          News
        </button>
        <div
          className={cn(styles.slider, themeClass, {
            [styles.slider_left]: isPhotos,
            [styles.slider_right]: !isPhotos,
          })}
        />
      </div>
      {isPhotos ? <PhotoGrid themeClass={themeClass} /> : <NewsCards themeClass={themeClass} />}
      </ShadowBox>
    </div>
    
  );
};

const PhotoGrid = ({ themeClass }: { themeClass: string }) => {
  const photos = [
    "https://img.freepik.com/free-photo/penne-pasta-with-meatballs-in-tomato-sauce-in-a-white-bowl_2829-7663.jpg?w=1380&t=st=1686827560~exp=1686828160~hmac=a00568cd673b6a263aa3e9d3e22e6d81170aa51efdafba7bf25443bfac4051d2",
    "https://img.freepik.com/free-photo/traditional-ukrainian-borscht-with-slices-of-brown-bread-and-a-soft-drink_140725-9202.jpg?w=740&t=st=1686827716~exp=1686828316~hmac=c3b76a37bf9abca48d7ee8b3091115bb422b5a72c0d3231f51354d24b9af6bfe",
    "https://img.freepik.com/premium-photo/ukrainian-food-borsch-with-lard-garlic-and-donuts-on-a-black-stone-background-top-view-rustic-style_187166-52492.jpg?w=1380",
    "https://img.freepik.com/free-photo/penne-pasta-with-meatballs-in-tomato-sauce-in-a-white-bowl_2829-7663.jpg?w=1380&t=st=1686827560~exp=1686828160~hmac=a00568cd673b6a263aa3e9d3e22e6d81170aa51efdafba7bf25443bfac4051d2",
    "https://img.freepik.com/free-photo/russian-salad-on-the-table_140725-7654.jpg?w=826&t=st=1686828429~exp=1686829029~hmac=448197ddb4a5bd9ac03f001b27a0cd4ef1b6060520932d83c8b69c0669d73a91",
    "https://img.freepik.com/free-photo/spaghetti-meatball-topped-with-parmesan-and-basil-food_53876-98317.jpg?w=826&t=st=1686828442~exp=1686829042~hmac=4a4c8e4b0c6c13eb3067dff8bb3cfd85b89498a658e48e6abcf759bed03c2666",
    "https://img.freepik.com/free-photo/tasty-different-meals-arrangement-top-view_23-2149178207.jpg?w=1380&t=st=1686828452~exp=1686829052~hmac=70e3e8019b7b1337bee02f92bc2f30ae32f23db302c6aeec5fcf627167e1c275",
    "https://img.freepik.com/free-photo/sliced-grilled-beef-steak-served-with-green-salad-with-eggs_140725-5065.jpg?w=740&t=st=1686828471~exp=1686829071~hmac=761fb02a1e6b9b2c3a2d4b7d4a4bb09ea85e13dad41e02a9b64a1cb91a3e44f4",
    "https://img.freepik.com/free-photo/a-bowl-of-pork-knuckle-noodles_1205-12610.jpg?w=1380&t=st=1686828483~exp=1686829083~hmac=ea533df9f7d65e848afda22df198a86957736d9afa47b32dc7eac8ba647cdaf6",
    "https://img.freepik.com/free-photo/warm-winter-quinoa-salad-with-pumpkin-chorizo-and-mozzarella-arugula-leaves-and-pomegranate_127032-2700.jpg?w=826&t=st=1686828546~exp=1686829146~hmac=41c05d158e3689905cc7ed752a2218b008a1307c9b671c46cf2916b9e13233cd",
    "https://img.freepik.com/free-photo/fresh-dumplings-with-strawberries-and-sour-cream_2829-11757.jpg?w=1380&t=st=1686828569~exp=1686829169~hmac=3f63bd70a03d8a053d9089a99370dc9b226402d787634cfbed996c8ad54fd1c7",
    "https://img.freepik.com/free-photo/side-view-of-traditional-russian-cabbage-soup-with-meat-in-a-white-bowl_140725-10324.jpg?w=740&t=st=1686828582~exp=1686829182~hmac=8850cc8c67844c55c2218989a432e288e6888f5dcdfa59aa70a4293150e18f0c",
  ];

  return (
    <div className={`${styles.photoGrid} ${themeClass}`}>
      {photos.map((photo, index) => (
        <div key={index} className={styles.photo}>
          <img src={photo} alt={`Photo ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

const NewsCards = ({ themeClass }: { themeClass: string }) => {
  // Пример данных новостей
  const newsData = [
    {
      id: 1,
      thumbnail: "https://img.freepik.com/free-photo/tasty-different-meals-arrangement-top-view_23-2149178207.jpg?w=1380&t=st=1686828452~exp=1686829052~hmac=70e3e8019b7b1337bee02f92bc2f30ae32f23db302c6aeec5fcf627167e1c275",
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      date: "1 hour ago",
      author: "CNN",
    },
    {
      id: 2,
      thumbnail: "https://img.freepik.com/free-photo/tasty-different-meals-arrangement-top-view_23-2149178207.jpg?w=1380&t=st=1686828452~exp=1686829052~hmac=70e3e8019b7b1337bee02f92bc2f30ae32f23db302c6aeec5fcf627167e1c275",
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      date: "1 hour ago",
      author: "CNN",
    },
    {
      id: 3,
      thumbnail: "https://img.freepik.com/free-photo/tasty-different-meals-arrangement-top-view_23-2149178207.jpg?w=1380&t=st=1686828452~exp=1686829052~hmac=70e3e8019b7b1337bee02f92bc2f30ae32f23db302c6aeec5fcf627167e1c275",
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      date: "1 hour ago",
      author: "CNN",
    },
    {
      id: 4,
      thumbnail: "https://img.freepik.com/free-photo/tasty-different-meals-arrangement-top-view_23-2149178207.jpg?w=1380&t=st=1686828452~exp=1686829052~hmac=70e3e8019b7b1337bee02f92bc2f30ae32f23db302c6aeec5fcf627167e1c275",
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      date: "1 hour ago",
      author: "CNN",
    },
    {
      id: 5,
      thumbnail: "https://img.freepik.com/free-photo/tasty-different-meals-arrangement-top-view_23-2149178207.jpg?w=1380&t=st=1686828452~exp=1686829052~hmac=70e3e8019b7b1337bee02f92bc2f30ae32f23db302c6aeec5fcf627167e1c275",
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      date: "1 hour ago",
      author: "CNN",
    },
    {
      id: 6,
      thumbnail: "https://img.freepik.com/free-photo/tasty-different-meals-arrangement-top-view_23-2149178207.jpg?w=1380&t=st=1686828452~exp=1686829052~hmac=70e3e8019b7b1337bee02f92bc2f30ae32f23db302c6aeec5fcf627167e1c275",
      title: "News Title Lorem Ipsum Dolor Sit Amet",
      date: "1 hour ago",
      author: "CNN",
    },
    // Другие новости...
  ];

  return (
    <div className={`${styles.newsCards} ${themeClass}`}>
      {newsData.map((news) => (
        <div key={news.id} className={styles.newsCard}>
          <img src={news.thumbnail} alt="Thumbnail" className={styles.thumbnail} />
          <div className={styles.details}>
            <h3 className={styles.title}>{news.title}</h3>
            <div className={styles.meta}>
              <span className={styles.date}>{news.date}</span>
              <span className={styles.author}>{news.author}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

