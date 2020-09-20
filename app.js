// Texting PRO APP 
// Made by =>AHSAN AZEEMI<= 
// =)JAVASCRIPT(=

login=()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;


        
        document.getElementById('userImage').src=user.photoURL
        document.getElementById('userName').innerHTML=user.displayName
        localStorage.setItem('user','Logged In')
        localStorage.setItem('userName',user.displayName)
        localStorage.setItem('userEmail',user.email)
        localStorage.setItem('userPhotoURL',user.photoURL)
        localStorage.setItem('userIdNo',user.uid)
        document.getElementById('loginArea').className='hide'
        document.getElementById('userArea').className='show'

        let uid = localStorage.getItem('userIdNo')
        // var key = firebase.database().ref('users/'+uid).push().key
        
        let userData = {
          name: localStorage.getItem('userName'),
          photoURL: localStorage.getItem('userPhotoURL'),
          emailAddress: localStorage.getItem('userEmail'),
          userIdNo: localStorage.getItem('userIdNo')
        }
        var m = localStorage.getItem('userEmail')
        var num = m.indexOf('@')
        var spli= m.split('')
        var sli = spli.splice(0,num)
        var joinedEmail = sli.join('')
        var emailIdHalf = joinedEmail
        var changedMail3 = emailIdHalf.replace('.','*')
        firebase.database().ref('users/'+changedMail3).set(userData)
        userProfile=()=>{
          document.getElementById('userProfileImage').src=userData.photoURL
          document.getElementById('userNameProfile').innerHTML= userData.name
          document.getElementById('userProfileEmail').innerHTML= userData.emailAddress
          document.getElementById('userProfileId').innerHTML= userData.userIdNo
          var now = new Date()
          var year = now.getFullYear()
          var month = now.getMonth()
          var date = now.getDate()
          var fulldate = year +' '+ month +' '+ date
          var allMonths = ['Jan','Feb,','Mar','Apr',"May","Jun","Jul",'Aug','Sep','Oct','Nov',"Dec"]
          var fulldate = `${date}-${allMonths[month]}-${year}`
          document.getElementById('lastLogin').innerHTML=fulldate
        }
        userProfile()
      }).catch(function(error) {
        console.log(error)
        document.getElementById('blur').classList='blur'
        document.getElementById('modalHide').style.display='flex'
      });
}

// sendSms=()=>{
//   // let id = localStorage.getItem('userEmail')
//   // id.indexOf('@')
//   var val = document.getElementById('inp1')
//   firebase.database().ref('users/'+id+'/'+ "messages").push(val.value)
// }
// let id = localStorage.getItem('userIdNo')
// firebase.database().ref('null'+'/'+ "messages").on('child_added',(data)=>{
//   document.getElementById('mes').innerHTML=data.val()
// })

addContact=()=>{
  var contact = document.getElementById('add_contacts').value 
        var num = contact.indexOf('@')
        var spli= contact.split('')
        var sli = spli.splice(0,num)
        var joinedEmail = sli.join('')
        var emailIdHalf = joinedEmail
        var changedMail4 = emailIdHalf.replace('.','*')

           firebase.database().ref('users/'+changedMail4+'/'+'emailAddress').on('value',(data)=>{
            var gotEmailData = data.val()
            checkEmail(gotEmailData)
          })
          checkEmail=(x)=>{
            if(x==contact && x!==localStorage.getItem('userEmail')){
            var div = document.createElement('div')
            div.setAttribute('id','myDiv1')
            var img = document.createElement('img')
            var h2 = document.createElement('h2')
            
            firebase.database().ref('users/'+changedMail4+'/'+'photoURL').on('value',(data)=>{
              var gotPhotoData = data.val()
              checkPhoto(gotPhotoData)
            })
            checkPhoto=(y)=>{
              img.src=y
              img.width='50'
              img.height='50'
              img.style.borderRadius='40px'
            }

            firebase.database().ref('users/'+changedMail4+'/'+'name').on('value',(data)=>{
              var gotNameData = data.val()
              checkName(gotNameData)
            })
            checkName=(z)=>{
              var txt = document.createTextNode(z)
              var i1 = document.createElement('i')
              var button1 = document.createElement('button')
              i1.classList="fas fa-trash"

              button1.onclick = ()=>{
                button1.parentElement.parentElement.remove()
              }
              div.onclick=()=>{
                document.getElementById('allMessages').classList='show'
                document.getElementById('messageSend').classList='show'
                if(document.getElementById('delPrevious')!==null){
                  document.getElementById('delPrevious').remove()
                  document.getElementById('allMessages').innerHTML=''
                }
                
                let h2 = document.createElement('h2')
                h2.setAttribute('id','delPrevious')
                h2.setAttribute('userMailAttr',x)
                let img5 =document.createElement('img')
                let span =document.createElement('span')

                img5.src=img.src
                
                var txt5 = document.createTextNode(txt.nodeValue)
                span.appendChild(txt5)

                h2.appendChild(img5)
                h2.appendChild(span)
                document.getElementById('allMessages').appendChild(h2)


                var MyEmail = localStorage.getItem('userEmail')
                var num = MyEmail.indexOf('@')
                var spli= MyEmail.split('')
                var sli = spli.splice(0,num)
                var joinedEmail = sli.join('')
                var emailIdHalfed = joinedEmail
                var changedMail2 = emailIdHalfed.replace('.','*')
                var userAttr = document.getElementById('delPrevious').getAttribute('userMailAttr')
                var numt = userAttr.indexOf('@')
                
                var split= userAttr.split('')
                var slit = split.splice(0,numt)
                var joinedEmailt = slit.join('')
                var emailIdHalft = joinedEmailt
                var changedMail1 = emailIdHalft.replace('.','*')
                


                setTimeout(()=>{firebase.database().ref('users/'+changedMail2+'/messages/'+changedMail1+'/').on('child_added',(data)=>{
                  console.log(data.val())
                  var message = document.createElement('div')
                  message.setAttribute('id','messageLi2')
                  var secondTxt = document.createTextNode(data.val())
                  message.appendChild(secondTxt)
                  document.getElementById('allMessages').appendChild(message)
                })},1000)
                
              }

              button1.appendChild(i1)
              h2.appendChild(txt)
              h2.appendChild(button1)
            }

            div.appendChild(img)
            div.appendChild(h2)
            document.getElementById('contactLists').appendChild(div)


            }else{
              document.getElementById('blur').classList='blur'
              document.getElementById('secondModalHide').style.display='flex'
            }
          }
      }
sendSMS =()=>{
  var val = document.getElementById('textInp').value
  let message = document.createElement('div')
  
  message.setAttribute('id','messageLi')
  let txtInp = document.createTextNode(val)
  message.appendChild(txtInp)
  document.getElementById('allMessages').appendChild(message)
  var mailEle=document.getElementById('delPrevious')
  var mail = (mailEle.getAttribute('usermailattr')).toString()
  var num = mail.indexOf('@')
  var spli= mail.split('')
  var sli = spli.splice(0,num)
  var joinedEmail = sli.join('')
  var emailIdHalf = joinedEmail
  var changedMail5 = emailIdHalf.replace('.','*')
  var mymail = localStorage.getItem('userEmail')
  var nums = mymail.indexOf('@')
  var splis= mymail.split('')
  var slis = splis.splice(0,nums)
  var joinedEmails = slis.join('')
  var myemailIdHalf = joinedEmails
  var changedMail6 = myemailIdHalf.replace('.','*')
  firebase.database().ref('users/'+changedMail5+'/'+"messages"+"/"+changedMail6 +'/').push(val)

  document.getElementById('textInp').value=''

 
}
document.getElementById('allMessages').classList='hide'
document.getElementById('messageSend').classList='hide'
signout=()=>{
  firebase.auth().signOut().then(function() {
  document.getElementById('loginArea').className='show'
  document.getElementById('userArea').className='hide'
  localStorage.clear()
}).catch(function(error) {
    document.getElementById('blur').classList='blur'
    document.getElementById('modalHide').style.display='flex'
});
}


closeError=()=>{
  document.getElementById('modalHide').style.display='none'
  document.getElementById('blur').classList='container'
  localStorage.clear()
  location.reload()
}
closeMailError=()=>{
  document.getElementById('secondModalHide').style.display='none'
  document.getElementById('blur').classList='container'
}
if(localStorage.getItem('user')=='Logged In'){ 
    document.getElementById('loginArea').className='hide'
    document.getElementById('userArea').className='show'
    document.getElementById('userName').innerHTML=localStorage.getItem('userName')
    document.getElementById('userImage').src=localStorage.getItem('userPhotoURL')

      document.getElementById('userProfileImage').src=localStorage.getItem('userPhotoURL')
      document.getElementById('userNameProfile').innerHTML= localStorage.getItem('userName')
      document.getElementById('userProfileEmail').innerHTML= localStorage.getItem('userEmail')
      document.getElementById('userProfileId').innerHTML= localStorage.getItem('userIdNo')
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth()
      var date = now.getDate()
      var fulldate = year +' '+ month +' '+ date
      var allMonths = ['Jan','Feb,','Mar','Apr',"May","Jun","Jul",'Aug','Sep','Oct','Nov',"Dec"]
      var fulldate = `${date}-${allMonths[month]}-${year}`
      document.getElementById('lastLogin').innerHTML=fulldate

    }

