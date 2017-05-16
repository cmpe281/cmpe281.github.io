    function getSelectedValue(elementId) {
    var elt = document.getElementById(elementId);
    if (elt.selectedIndex == -1)
        return null;
    return elt.options[elt.selectedIndex].value;
    }

    function adminClusters()
    { 
      var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/adminclusters/"+session_usr, 
        type: "GET",  
     success: function(data) { 
        $('#clusters').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th>Select</th><th>Name</th><th>Area id</th><th>Admin</th><th>Created on</th></tr></thead>";
        for(i = 0; i < data.clusterList.length; i++){
          var dateCreatedadmin = new Date(data.clusterList[i].dateCreated);
          trHTML += '<tr><td><input type="button" value="Edit" onclick="editForm(\''+data.clusterList[i].id+'\');"></input></td><td>' + data.clusterList[i].name + '</td><td>'+ data.clusterList[i].area.name + '</td><td>'+data.clusterList[i].admin.firstName +'</td><td>'+dateCreatedadmin +'</td></tr>';
        }
        trHTML+="</table>";
        $('#clusters').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      });        
      var optionArea = "<option value=0>Select area</option>";
      $('#optionArea').html('');
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/area", 
        type: "GET",   
     success: function(data) { 
        for(i = 0; i < data.areas.length; i++){
         optionArea += '<option value='+data.areas[i].id+'>'+data.areas[i].name+'</option>';
        }
        $('#optionArea').append(optionArea);
     },
        contentType: "application/json",
        dataType: "json" 
      });          
    }
    function editForm(event){
      $('#clusters').html('');
      document.getElementById('saveCluster').style.display = "inline";
      document.getElementById('createCluster').style.display = "none";
      document.getElementById('clusterDetailForm').style.display = "inline";
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/cluster/"+event, 
        type: "GET",   
     success: function(data) { 
      document.getElementById('clustername').value = data.cluster.name;
      document.getElementById('clusterid').value = data.cluster.id;
      document.getElementById('optionArea').value = data.cluster.area.id;
      document.getElementById('admin').value = data.cluster.admin.username;
      var dateCreatedadmin = new Date(data.cluster.dateCreated);
      document.getElementById('createdOn').value = dateCreatedadmin;
     },
        contentType: "application/json",
        dataType: "json" 
      });        
    }
    function editUser(event){
      $('#users').html('');
      document.getElementById('saveUser').style.display = "inline";
      document.getElementById('createUser').style.display = "none";
      document.getElementById('userForm').style.display = "inline";
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/user/"+event, 
        type: "GET",   
     success: function(data) { 
    document.getElementById('usrname').value    = data.user.username;
    document.getElementById('fname').value      = data.user.firstName;
    document.getElementById('lname').value      = data.user.lastName;
    document.getElementById('address').value    = data.user.address;
    document.getElementById('email').value      = data.user.email;
    document.getElementById('password').value      = data.user.password;
    document.getElementById('contactNo').value  = data.user.contactNumber;
    document.getElementById('optionClusterName').value   = data.user.cluster.id;
    document.getElementById('userid').value   = data.user.id;
    document.getElementById('optionUserNodeName').value   = data.user.role.id;
     },
        contentType: "application/json",
        dataType: "json" 
      });        
    }    
    function deleteServiceNode(event){
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/servicenode/"+event, 
        type: "DELETE",   
     success: function(data) {
        },
        contentType: "application/json",
        dataType: "json" 
      });   
      }
    function deleteUserNode(event){
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/role/"+event, 
        type: "DELETE",   
     success: function(data) {
        },
        contentType: "application/json",
        dataType: "json" 
      });   
      }  
    function deleteUser(event){
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/user/"+event, 
        type: "DELETE",   
     success: function(data) {
        alert('User deleted successfully, Redirecting..');
        window.location.href = "usermgmt.html";
        },
        contentType: "application/json",
        dataType: "json" 
      });   
      }   
    function deleteService(event){
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/service/"+event, 
        type: "DELETE",   
     success: function(data) {
        alert('Service deleted successfully, Redirecting..');
        window.location.href = "servicemgmt.html";
        },
        contentType: "application/json",
        dataType: "json" 
      });   
      }           
    function deleteCluster(event){
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/cluster/"+event, 
        type: "DELETE",   
     success: function(data) {
        alert('Cluster deleted successfully, Redirecting..');
        window.location.href = "clustermgmt.html";
        },
        contentType: "application/json",
        dataType: "json" 
      });   
      }          
    function clusterService(){
      var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/clusterservicebyadmin/"+session_usr, 
        type: "GET",  
     success: function(data) { 
        $('#services').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th>Select</th><th>Cluster Name</th><th>Name</th><th>Service node</th><th>Sender user node</th><th>Receiver user node</th></tr></thead>";
        for(i = 0; i < data.clusterServicesList.length; i++){
          // var dateCreated = new Date(data.clusterServicesList[i].dateCreated);
          trHTML += '<tr><td><input type="button" value="Edit" onclick="editForm(\''+data.clusterServicesList[i].id+'\');"></input></td><td>' + data.clusterServicesList[i].cluster.name + '</td><td>'+ data.clusterServicesList[i].name + '</td><td>'+data.clusterServicesList[i].serviceNode.name +'</td><td>'+data.clusterServicesList[i].sender.name +'</td><td>'+data.clusterServicesList[i].receipient.name +'</td></tr>';
        }
        trHTML+="</table>";
        $('#services').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      });        
      var optionClusterName = "<option value=0>Select cluster name</option>";
      var optionServiceNodeName = "<option value=0>Select service node</option>";
      var optionUserNodeName = "<option value=0>Select user node</option>";
      $('#optionClusterName').html('');
      $('#optionServiceNodeName').html('');
      $('#optionSenderUserNodeName').html('');
      $('#optionReceiverUserNodeName').html('');
      var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/adminclusters/"+session_usr, 
        type: "GET",   
     success: function(data) { 
        for(i = 0; i < data.clusterList.length; i++){
         optionClusterName += '<option value='+data.clusterList[i].id+'>'+data.clusterList[i].name+'</option>';
        }
        $('#optionClusterName').append(optionClusterName);
     },
        contentType: "application/json",
        dataType: "json" 
      });  
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/servicenode/"+session_usr, 
        type: "GET",   
     success: function(data) { 
        for(i = 0; i < data.serviceNodeList.length; i++){
         optionServiceNodeName += '<option value='+data.serviceNodeList[i].id+'>'+data.serviceNodeList[i].name+'</option>';
        }
        $('#optionServiceNodeName').append(optionServiceNodeName);
     },
        contentType: "application/json",
        dataType: "json" 
      }); 
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/createdbyrole/"+session_usr, 
        type: "GET",   
     success: function(data) { 
        for(i = 0; i < data.roles.length; i++){
         optionUserNodeName += '<option value='+data.roles[i].id+'>'+data.roles[i].name+'</option>';
        }
        $('#optionSenderUserNodeName').append(optionUserNodeName);
        $('#optionReceiverUserNodeName').append(optionUserNodeName);
     },
        contentType: "application/json",
        dataType: "json" 
      });               
    }        
    function clusterUser()
    {
    var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/adminusers/"+session_usr, 
        type: "GET",  
     success: function(data) { 
        $('#users').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th>Select</th><th>Cluster name</th><th>User node</th><th>User name</th><th>First name</th><th>Last name</th><th>Email address</th></tr></thead>";
        for(i = 0; i < data.userList.length; i++){
          trHTML += '<tr><td><input type="button" value="Edit" onclick="editUser(\''+data.userList[i].id+'\');"></input></td><td>' + data.userList[i].cluster.name + '</td><td>'+ data.userList[i].role + '</td><td>'+data.userList[i].username +'</td><td>'+data.userList[i].firstName +'</td><td>'+data.userList[i].lastName +'</td><td>'+data.userList[i].email +'</td></tr>';
        }
        trHTML+="</table>";
        $('#users').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      });      
      var optionClusterName = "<option value=0>Select cluster name</option>";
      var optionUserNodeName = "<option value=0>Select user node</option>";
      $('#optionClusterName').html('');
      $('#optionUserNodeName').html('');
      var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/adminclusters/"+session_usr, 
        type: "GET",   
     success: function(data) { 
        for(i = 0; i < data.clusterList.length; i++){
         optionClusterName += '<option value='+data.clusterList[i].id+'>'+data.clusterList[i].name+'</option>';
        }
        $('#optionClusterName').append(optionClusterName);
     },
        contentType: "application/json",
        dataType: "json" 
      });  
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/createdbyrole/"+session_usr, 
        type: "GET",   
     success: function(data) { 
        for(i = 0; i < data.roles.length; i++){
         optionUserNodeName += '<option value='+data.roles[i].id+'>'+data.roles[i].name+'</option>';
        }
        $('#optionUserNodeName').append(optionUserNodeName);
     },
        contentType: "application/json",
        dataType: "json" 
      });              
    }       
    $(document).ready(function(){
    $("#createAdmin").click(function(){
	   var usrname = document.getElementById('usrname').value;  
	   var fname = document.getElementById('fname').value;  
	   var lname = document.getElementById('lname').value;  
	   var address = document.getElementById('address').value;  
  	 var email = document.getElementById('email').value;  
	   var contactNo = document.getElementById('contactNo').value;  
     var password = document.getElementById('password').value;    
    $.ajax({
    type: 'POST',
    url: 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/user',
    data: JSON.stringify ({firstName:fname,lastName:lname,username:usrname,password:password,address:address,email:email,contactNumber:contactNo,role:{id:'2',name:'admin'} }),
    success: function(data) { alert('data: ' + data); },
    contentType: "application/json",
    dataType: 'json'
		}); 
    event.preventDefault();   
  	});

    $("#createCluster").click(function(){
    var  name = document.getElementById('clustername').value;
    var area = getSelectedValue('optionArea');
    var session_usr =  localStorage.getItem("sessionUsr");
    $.ajax({
    type: 'POST',
    url: 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/cluster',
    data: JSON.stringify ({name:name,admin:{id:session_usr},area:{id:area} }),
    success: function(data) { alert('Cluster ' + data.cluster.name + ' created successfully, Redirecting..');
                              window.location.href = "clustermgmt.html"; },
    contentType: "application/json",
    dataType: 'json'
    });    
    event.preventDefault();
    });
    $("#submitservice").click(function(){
        var comment = document.getElementById('comment').value;
        var serviceid = getSelectedValue('selectservice');
        var session_usr =  localStorage.getItem("sessionUsr");
        $.ajax({
        type: 'POST',
        url: 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/userdiscussion',
        data: JSON.stringify ({clusterServices:{id:serviceid},createdBy:{id:session_usr},comments:comment}),
        success: function(data) {
                                  window.location.href = "user-dashboard.html"; },
        contentType: "application/json",
        dataType: 'json'
        }); 
        event.preventDefault();
        });
    $("#userdetailsupdate").click(function(){
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var firstName = document.getElementById('firstname').value;
        var lastName = document.getElementById('lastname').value;
        var contactNumber = document.getElementById('phonenumber').value;
        var address = document.getElementById('address').value;
        var session_usr =  localStorage.getItem("sessionUsr");
        var url2= 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/user/'+session_usr;
        $.ajax({
        type: 'PUT',
        url: url2,
        data: JSON.stringify ({email:email,password:password,firstName:firstName,lastName:lastName,contactNumber:contactNumber,address:address}),

        success: function(data) {
                                  window.location.href ="user-editprofile.html";},
        contentType: "application/json",
        dataType: 'json'
        });    
        event.preventDefault();
        });
    $("#saveCluster").click(function(){
    var  id = document.getElementById('clusterid').value      ;
    var  name = document.getElementById('clustername').value      ;
    var area = getSelectedValue('optionArea');
    var session_usr =  localStorage.getItem("sessionUsr");
    $.ajax({
    type: 'PUT',
    url: 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/cluster/'+id,
    data: JSON.stringify ({name:name,admin:{id:session_usr},area:{id:area} }),
    success: function(data) { alert('Cluster ' + data.cluster.name + ' saved successfully, Redirecting..');
                              window.location.href = "clustermgmt.html";  },
    contentType: "application/json",
    dataType: 'json'
    });    
    event.preventDefault();
    });   

  
  
	$("#goBack").click(function(){
		window.location.href = "index.html";
	//window.history.back();
	});

	$("#login").click(function(event){
	   var username = document.getElementById('username').value;   
    var password = document.getElementById('password').value; 
     $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/login", 
        type: "POST",
        data: JSON.stringify({username:username,password:password}),   
     success: function(response) { 
      if (response.code == "202")
      {localStorage.setItem("sessionUsr", response.user.id);
     window.location.href = "clustermgmt.html";}
     },
        contentType: "application/json",
        dataType: "json" 
     	}); 
     event.preventDefault();
  });
	$("#login_u").click(function(event){
		   var username = document.getElementById('username').value;   
	    var password = document.getElementById('password').value; 
	     $.ajax({
	        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/login", 
	        type: "POST",
	        data: JSON.stringify({username:username,password:password}),   
	     success: function(response) { 
	      if (response.code == "202")
	      {localStorage.setItem("sessionUsr", response.user.id);
	     window.location.href = "user-dashboard.html";}
	     },
	        contentType: "application/json",
	        dataType: "json" 
	     	}); 
	     event.preventDefault();
	  });	

$("#clusterList").click(function(event){
      var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/adminclusters/"+session_usr, 
        type: "GET",   
     success: function(data) { 
      $('#clusters').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th>Select</th><th>Name</th><th>Area id</th><th>Admin</th><th>Created on</th></tr></thead>";
        for(i = 0; i < data.clusterList.length; i++){
          var dateCreatedadmin = new Date(data.clusterList[i].dateCreated);
          trHTML += '<tr><td><input type="button" value="Edit" onclick="editForm(\''+data.clusterList[i].id+'\');"></input></td><td>' + data.clusterList[i].name + '</td><td>'+ data.clusterList[i].area.name + '</td><td>'+data.clusterList[i].admin.firstName +'</td><td>'+dateCreatedadmin +'</td></tr>';
        }
        trHTML+="</table>";
        $('#clusters').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      }); 
    document.getElementById('clusterDetailForm').style.display = 'none';
     event.preventDefault();

  }); 
$("#delCluster").click(function(event){
  var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/adminclusters/"+session_usr, 
        type: "GET", 
     success: function(data) { 
      $('#clusters').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th width='5%'>Select</th><th>Name</th></tr></thead>";
        for(i = 0; i < data.clusterList.length; i++){
          trHTML += '<tr><td width="5%"><input type="button" value="Delete" onclick="deleteCluster(\''+data.clusterList[i].id+'\');"></input></td><td>'+data.clusterList[i].name+'</td></tr>';
        }
        trHTML+="</table>";
        $('#clusters').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      }); 
     document.getElementById('clusterDetailForm').style.display = 'none';   
     event.preventDefault();
  }); 

$("#createClusterForm").click(function(event){
  $('#clusters').html('');
  document.getElementById('clusterDetailForm').style.display = 'inline';
  event.preventDefault();
  }); 
$("#userNode").click(function(event){
     document.getElementById('userNodeForm').style.display = 'inline';
     document.getElementById('userForm').style.display = 'none';
     $("#users").html('');     
     event.preventDefault();
  }); 
$("#createUserNode").click(function(){ 
  var session_usr = localStorage.getItem("sessionUsr");
  var userNode = document.getElementById('userNodeName').value;    
    $.ajax({
    type: 'POST',
    url: 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/role',
    data: JSON.stringify ({name:userNode,createdBy:{id:session_usr}}),
    success: function(data) { alert('data: ' + data); },
    contentType: "application/json",
    dataType: 'json'
    });    
    event.preventDefault(); 
    });  
$("#delUserNode").click(function(event){
  var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/createdbyrole/"+session_usr, 
        type: "GET", 
     success: function(data) { 
      $('#users').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th width='5%'>Select</th><th>Name</th></tr></thead>";
        for(i = 0; i < data.roles.length; i++){
          trHTML += '<tr><td width="5%"><input type="button" value="Delete" onclick="deleteUserNode(\''+data.roles[i].id+'\');"></input></td><td>'+data.roles[i].name+'</td></tr>';
        }
        trHTML+="</table>";
        $('#users').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      }); 
     document.getElementById('userNodeForm').style.display = 'none';
     document.getElementById('userForm').style.display = 'none';
     event.preventDefault();
  }); 
$("#userList").click(function(event){
    var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/adminusers/"+session_usr, 
        type: "GET",  
     success: function(data) { 
        $('#users').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th>Select</th><th>Cluster name</th><th>User node</th><th>User name</th><th>First name</th><th>Last name</th><th>Email address</th></tr></thead>";
        for(i = 0; i < data.userList.length; i++){
          trHTML += '<tr><td><input type="button" value="Edit" onclick="editUser(\''+data.userList[i].id+'\');"></input></td><td>' + data.userList[i].cluster.name + '</td><td>'+ data.userList[i].role.name + '</td><td>'+data.userList[i].username +'</td><td>'+data.userList[i].firstName +'</td><td>'+data.userList[i].lastName +'</td><td>'+data.userList[i].email +'</td></tr>';
        }
        trHTML+="</table>";
        $('#users').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      }); 
        event.preventDefault();
});
$("#delUser").click(function(event){
  var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/adminusers/"+session_usr, 
        type: "GET", 
     success: function(data) { 
      $('#users').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th width='5%'>Select</th><th width='30%'>Cluster Name</th><th>User Name</th></tr></thead>";
        for(i = 0; i < data.userList.length; i++){
          trHTML += '<tr><td width="5%"><input type="button" value="Delete" onclick="deleteUser(\''+data.userList[i].id+'\');"></input></td><td>'+data.userList[i].cluster.name+'</td><td>'+data.userList[i].username +'</td></tr>';
        }
        trHTML+="</table>";
        $('#users').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      }); 
     document.getElementById('userNodeForm').style.display = 'none';
     document.getElementById('userForm').style.display = 'none';
     event.preventDefault();
  }); 
    $("#createUser").click(function(){
     var session_usr = localStorage.getItem("sessionUsr");
     var clustername = getSelectedValue('optionClusterName');
     var usernodename = getSelectedValue('optionUserNodeName');
     var usrname = document.getElementById('usrname').value;  
     var fname = document.getElementById('fname').value;  
     var lname = document.getElementById('lname').value;  
     var address = document.getElementById('address').value;  
     var email = document.getElementById('email').value;  
     var contactNo = document.getElementById('contactNo').value;  
     var password = document.getElementById('password').value;    
    $.ajax({
    type: 'POST',
    url: 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/user',
    data: JSON.stringify ({firstName:fname,lastName:lname,username:usrname,password:password,role:{id:usernodename},createdBy:{id:session_usr},address:address,email:email,contactNumber:contactNo,cluster:{id:clustername} }),
    success: function(data) {alert('User created successfully, Redirecting..');
                              window.location.href = "usermgmt.html"; },
    contentType: "application/json",
    dataType: 'json'
    }); 
    event.preventDefault();   
    });
    $("#saveUser").click(function(){
     var session_usr = localStorage.getItem("sessionUsr");
     var clustername = getSelectedValue('optionClusterName');
     var usernodename = getSelectedValue('optionUserNodeName');
     var usrname = document.getElementById('usrname').value;  
     var fname = document.getElementById('fname').value;  
     var lname = document.getElementById('lname').value;  
     var address = document.getElementById('address').value;  
     var email = document.getElementById('email').value;  
     var contactNo = document.getElementById('contactNo').value;  
     var password = document.getElementById('password').value; 
     var userid = document.getElementById('userid').value; 
    $.ajax({
    type: 'PUT',
    url: 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/user/'+userid,
    data: JSON.stringify ({firstName:fname,lastName:lname,username:usrname,password:password,role:{id:usernodename},createdBy:{id:session_usr},address:address,email:email,contactNumber:contactNo,cluster:{id:clustername} }),
    success: function(data) { alert('User saved successfully, Redirecting..');
                              window.location.href = "usermgmt.html";  },
    contentType: "application/json",
    dataType: 'json'
    });    
    event.preventDefault();
    });     
$("#user").click(function(){ 
  document.getElementById('userNodeForm').style.display = 'none';
  $('#users').html('');
  document.getElementById('userForm').style.display = 'inline';
    }); 

$("#serviceList").click(function(event){
      var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/clusterservicebyadmin/"+session_usr, 
        type: "GET",  
     success: function(data) { 
        $('#services').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th>Select</th><th>Cluster Name</th><th>Name</th><th>Service node</th><th>Sender user node</th><th>Receiver user node</th></tr></thead>";
        for(i = 0; i < data.clusterServicesList.length; i++){
          // var dateCreated = new Date(data.clusterServicesList[i].dateCreated);
          trHTML += '<tr><td><input type="button" value="Edit" onclick="editForm(\''+data.clusterServicesList[i].id+'\');"></input></td><td>' + data.clusterServicesList[i].cluster.name + '</td><td>'+ data.clusterServicesList[i].name + '</td><td>'+data.clusterServicesList[i].serviceNode.name +'</td><td>'+data.clusterServicesList[i].sender.name +'</td><td>'+data.clusterServicesList[i].receipient.name +'</td></tr>';
        }
        trHTML+="</table>";
        $('#services').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      });

     document.getElementById('serviceNodeForm').style.display = 'none';
     document.getElementById('serviceForm').style.display = 'none';        
     event.preventDefault();

  }); 


$("#serviceNode").click(function(event){
     $('#services').html('');
     document.getElementById('serviceNodeForm').style.display = 'inline';
     document.getElementById('serviceForm').style.display = 'none';
     event.preventDefault();

  }); 
$("#createServiceNode").click(function(){ 
  var serviceNode = document.getElementById('serviceNodeName').value;    
  var session_usr = localStorage.getItem("sessionUsr");
    $.ajax({
    type: 'POST',
    url: 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/servicenode',
    data: JSON.stringify ({name:serviceNode,createdBy:{id:session_usr}}),
    success: function(data) { alert('data: ' + data); },
    contentType: "application/json",
    dataType: 'json'
    });   
    event.preventDefault(); 
    }); 
$("#service").click(function(){ 
   $('#services').html('');
  document.getElementById('serviceNodeForm').style.display = 'none';
  document.getElementById('serviceForm').style.display = 'inline';
  event.preventDefault();
    }); 
$("#delServiceNode").click(function(event){
      var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/servicenode/"+session_usr, 
        type: "GET",   
     success: function(data) { 
      $('#services').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th width='5%'>Select</th><th>Name</th></tr></thead>";
        for(i = 0; i < data.serviceNodeList.length; i++){
          trHTML += '<tr><td width="5%"><input type="button" value="Delete" onclick="deleteServiceNode(\''+data.serviceNodeList[i].id+'\');"></input></td><td>'+data.serviceNodeList[i].name+'</td></tr>';
        }
        trHTML+="</table>";
        $('#services').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      }); 
     document.getElementById('serviceNodeForm').style.display = 'none';
     document.getElementById('serviceForm').style.display = 'none';
     event.preventDefault();
  });
$("#delService").click(function(event){
      var session_usr = localStorage.getItem("sessionUsr");
        $.ajax({
        url: "http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/clusterservicebyadmin/"+session_usr, 
        type: "GET",   
     success: function(data) { 
      $('#services').html('');
        var trHTML = "<table class='table table-bordered'><thead><tr><th width='5%'>Select</th><th>Cluster Name</th><th>Service name</th><th>Service node name</th></tr></thead>";
        for(i = 0; i < data.clusterServicesList.length; i++){
          trHTML += '<tr><td><input type="button" value="Delete" onclick="deleteService(\''+data.clusterServicesList[i].id+'\');"></input></td><td>' + data.clusterServicesList[i].cluster.name + '</td><td>'+ data.clusterServicesList[i].name + '</td><td>'+data.clusterServicesList[i].serviceNode.name +'</td></tr>';
        }
        trHTML+="</table>";
        $('#services').append(trHTML);
     },
        contentType: "application/json",
        dataType: "json" 
      }); 
     document.getElementById('serviceNodeForm').style.display = 'none';
     document.getElementById('serviceForm').style.display = 'none';
     event.preventDefault();
  });
    $("#createService").click(function(){
    var clusterid = getSelectedValue('optionClusterName');
    var serviceNodeid = getSelectedValue('optionServiceNodeName');
    var senderid = getSelectedValue('optionSenderUserNodeName');
    var receipientid = getSelectedValue('optionReceiverUserNodeName');
    var name = document.getElementById('serviceName').value;   
    var session_usr =  localStorage.getItem("sessionUsr");
    $.ajax({
    type: 'POST',
    url: 'http://custom-env.jjkdyjrpmq.us-east-1.elasticbeanstalk.com/clusterservice',
    data: JSON.stringify ({name:name,cluster:{id:clusterid},sender:{id:senderid},receipient:{id:receipientid},serviceNode:{id:serviceNodeid},createdBy:{id:session_usr} }),
    success: function(data) { alert('data: ' + data); },
    contentType: "application/json",
    dataType: 'json'
    });    
    event.preventDefault();
    });   
  });