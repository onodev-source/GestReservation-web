import RequestDashboard from "../Services/Api/ApiServices";


export const getAllComment = async(setLoader, activityUser, userId, users,setAllComments, setMessage) => {
  setLoader(true)
  let res = await RequestDashboard(activityUser ? `gestreserv/commentaries/by-user/${userId}/` : `gestreserv/commentaries/`, 'GET', '', users?.access_token);
  if (res.status === 200) {
    setAllComments(res?.response?.results);
    setLoader(false)
  }else if (res.status === 404){
    setAllComments([]);
    setMessage(res.response?.message)
    setLoader(false)
  }
}

export const getAllReservations = async({setLoading, activityUser, userId, users, setOrders}) => {
  setLoading(true)
  let res = await RequestDashboard(activityUser ? `gestreserv/orders/by-user/${userId}/` : `gestreserv/orders/`, 'GET', '', users?.access_token);
  if (res.status === 200) {
    setOrders(activityUser ?  res.response : res?.response?.results);
    setLoading(false)
  }
}

export const getAllInvoices = async(setLoader, users, setAllInvoice) => {
  setLoader(true)
  let res = await RequestDashboard('gestreserv/invoices/', 'GET', '', users.access_token);
  if (res.status === 200) {
    setAllInvoice(res?.response?.results);
    setLoader(false)
  }
}

export const getAllCustomers = async(setLoader, users, setAllCustomers) => {
  setLoader(true)
  let res = await RequestDashboard('gestreserv/customers/', 'GET', '', users.access_token);
  if (res.status === 200) {
    setAllCustomers(res.response?.results);
    setLoader(false)
  }
};

export const likeCommentById = async(packageId, users, commentId, getAllcomment, setVisible) => {
    
    let data = {
        content: '',
        user: {
          email: users?.users.email
        },
        packages: [packageId]
    };
      
    let res = await RequestDashboard(`gestreserv/commentaries/${commentId}/like/`, 'POST', data, users?.access_token)

    if(res.status === 200) {
        getAllcomment()
        setVisible(res.response?.like)
    } 
};