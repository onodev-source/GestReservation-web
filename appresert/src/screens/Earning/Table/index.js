import React from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import { numberWithCommas } from "../../../utils.js";
import Card from "../../../components/Card/index.js";
import Form from "../../../components/Form/index.js";
import Dropdown from "../../../components/Dropdown/index.js";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal/index.js";
import Details from "../../Refunds/Row/Details/index.js";
import Actions from "../../../components/Actions/index.js";
import Routes from "../../../Constants/Routes.js";

const items = [
  {
    date: "Fri, Apr 9",
    status: false,
    sales: 28,
    earnings: 3140,
  },
  {
    date: "Sat, Apr 10",
    status: true,
    sales: 24,
    earnings: 2568,
  },
  {
    date: "Sun, Apr 11",
    status: false,
    sales: 16,
    earnings: 1375.88,
  },
  {
    date: "Mon, Apr 12",
    status: true,
    sales: 48,
    earnings: 4955.86,
  },
  {
    date: "Tue, Apr 13",
    status: true,
    sales: 32,
    earnings: 2233.44,
  },
  {
    date: "Wed, Apr 14",
    status: false,
    sales: 64,
    earnings: 6140,
  },
  {
    date: "Thu, Apr 15",
    status: true,
    sales: 8,
    earnings: 789.32,
  },
];
const item = 
{
  id: 4,
  product: "Academe 3D Education Icons",
  category: "UI design kit",
  image: "/images/content/product-pic-5.jpg",
  image2x: "/images/content/product-pic-5@2x.jpg",
  status: true,
  date: "9 Sep",
  man: "Reyna Nikolaus",
  amount: "9800000",
  avatar: "/images/content/avatar-5.jpg",
  parameters: [
    {
      title: "Request send",
      content: "Aug 20, 2021",
    },
    {
      title: "Reason",
      content: "Download link is broken",
    },
    {
      title: "Product downloaded",
      downloadedStatus: true,
      downloadedValue: true,
    },
    {
      title: "Purchase date",
      content: "July 01, 2021",
    },
    {
      title: "Purchase code",
      content: "6373ads-hd73h-8373DS",
    },
    {
      title: "Request ID",
      content: "8975ads-hd73h-8974DS",
    },
    {
      title: "Market fee",
      tooltip: "Description Market fee",
      price: 7.28,
    },
    {
      title: "Price",
      tooltip: "Description Price",
      price: 72.88,
    },
  ],
}

const navigation = ["Active", "New", "A-Z", "Z-A"];

const Table = ({activityUser}) => {
  const [activeTab, setActiveTab] = React.useState(navigation[0]);
  const [search, setSearch] = React.useState("");
  //const [visible, setVisible] = React.useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);

  const actions = [
    {
      title: "Edit",
      icon: "edit",
      url: Routes.RESERVATION_EDIT,
    },
    {
      title: "Delete",
      icon: "trash",
      action: () => console.log("delete"),
    },
    {
      title: "Details",
      icon: "arrow-right",
      action: () => setVisibleModal(true),
    }
  ];

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <div className={cn(styles.wrapper, {[styles.wrapperNone] : activityUser})}>
      <Card className={cn(styles.card, {[styles.wrapperNone] : activityUser})} title={!activityUser && "Reservations list"} classTitle={cn("title-red", styles.cardTitle)} classCardHead={cn(styles.head)}
      head={ !activityUser &&
        <>
          <Form className={styles.form} value={search}
            setValue={setSearch} onSubmit={() => handleSubmit()} placeholder="Search by name or email" type="text"
            name="search" icon="search"
          />
          <div className={styles.sorting}>
            <Dropdown classDropdownHead={styles.dropdownHead} value={activeTab} setValue={setActiveTab} options={navigation} small />
            <Link className={cn("button button-small", styles.button)} to={Routes.RESERVATION_ADD} >
              Add Reservation
            </Link>
          </div>
        </>
      }>
      </Card>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>Date</div>
          <div className={styles.col}>Status</div>
          <div className={styles.col}>Product sales count</div>
          <div className={styles.col}>Earnings</div>
          <div className={styles.col}>Actions</div>
        </div>
        {items.map((x, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.col}>{x.date}</div>
            <div className={styles.col}>
              {x.status ? (
                <div
                  className={cn(
                    { "status-green-dark": x.status === true },
                    styles.status
                  )}
                >
                  Paid
                </div>
              ) : (
                <div
                  className={cn(
                    { "status-yellow": x.status === false },
                    styles.status
                  )}
                >
                  Pending
                </div>
              )}
            </div>
            <div className={styles.col}>{x.sales}</div>
            <div className={styles.col}>
              ${numberWithCommas(x.earnings.toFixed(2))}
            </div>
            <div className={styles.col}>
              <Actions className={styles.actions} classActionsHead={styles.actionsHead} classActionsBody={styles.actionsBody }classActionsOption={styles.actionsOption} items={actions}/>
            </div>
          </div>
        ))}
      </div>
      <Modal  outerClassName={styles.outer}  visible={visibleModal} onClose={() => setVisibleModal(false)} >
        <Details item={item} />
      </Modal>
    </div>
  );
};

export default Table;
