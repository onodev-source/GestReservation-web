import React, { useState } from "react";
import styles from "./Details.module.sass";
import cn from "classnames";
import Product from "./Product";
import Parameter from "./Parameter";
import TooltipGlodal from "../../../../components/TooltipGlodal";
import Editor from "../../../../components/Editor";

const suggestions = [
  "Talk to customer to see if you can help.",
  "If not, approve or decline the request.",
];

const Details = ({ item, customersDetails, onClose }) => {
  const [content, setContent] = useState();

  return (
    <>
      <div className={styles.details}>
        <div className={cn("title-purple", styles.title)}>{customersDetails ? "Customer details" : " Income detals"}</div>
        <div className={styles.row}>
          <div className={cn(styles.col, { [styles.colMax]: customersDetails })}>
            <Product className={styles.product} item={item} />
            <div className={styles.parameters}>
              {item.parameters.map((x, index) => (
                <Parameter item={x} key={index} />
              ))}
            </div>
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)} onClick={onClose}>
                Cancel
              </button>
              <button className={cn("button", styles.button)}>
                Delete
              </button>
            </div>
          </div>
          {!customersDetails &&
            <div className={styles.col}>
              <div className={styles.group}>
                <div className={styles.box}>
                  <div className={styles.info}>Suggestions</div>
                  <ul className={styles.list}>
                    {suggestions.map((x, index) => (
                      <li key={index}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.box}>
                  <div className={styles.info}>Download link is broken</div>
                  <div className={styles.text}>
                    “ I can’t download your item at all. Even tried to change the
                    DNS or VNP, it still doesn’t work.{" "}
                    <span role="img" aria-label="smile">
                      😢
                    </span>
                    ”{" "}
                  </div>
                  <div className={styles.user}>
                    <div className={styles.avatar}>
                      <img src={item.avatar} alt="Avatar" />
                    </div>
                    {item.man}
                  </div>
                </div>
              </div>
              <Editor
                state={content}
                onChange={setContent}
                classEditor={styles.editor}
                label="Send message"
                tooltip="Send message"
                button="Send"
              />
            </div>
          }
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Details;
