import RequestDashboard from "../Services/Api/ApiServices";


export const getAllComment = async(setLoader, activityUser, userId, users,setAllComments, setMessage) => {
    setLoader(true)
    let res = await RequestDashboard(activityUser ? `gestreserv/commentaries/by-user/${userId}/` : `gestreserv/commentaries/`, 'GET', '', users.access_token);
    if (res.status === 200) {
      setAllComments(res?.response?.results);
      setLoader(false)
    }else if (res.status === 404){
      setAllComments([]);
      setMessage(res.response?.message)
      setLoader(false)
    }
  }

export const likeCommentById = async(packageId, users, commentId, getAllcomment, setVisible) => {
    
    let data = {
        content: '',
        user: {
          email: users.users.email
        },
        packages: [packageId]
    };
      
    let res = await RequestDashboard(`gestreserv/commentaries/${commentId}/like/`, 'POST', data, users.access_token)

    if(res.status === 200) {
        getAllcomment()
        setVisible(res.response?.like)
    } 
};