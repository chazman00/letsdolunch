$(document).ready(
	function(){
		$("#signup").click(function(){
			if($('#password').val()!==$('#confirmpassword').val()){
				alert("Password and Confirm Password Don't Match");
				return;
			}
			var user = new StackMob.User({ username: $('#email').val(), password: $('#password').val()});
			user.create({
			  success: function(model, result, options) {alert('user created');},
			  error: function(model, result, options) {
				  alert(result.error);
				  console.debug(result);
				  console.debug(model);
				  console.debug(options);
			  }
			});
		});
		
		$("#signin").click(function(){
			
			var user = new StackMob.User({ username: $('#email').val(), password: $('#password').val()});
			user.login(true, {
			  success: function(model, result, options) {alert('user logged in');},
			  error: function(model, result, options) {alert(result);}
			});
		});
		
		
		$("#forgotpassword").click(function(){
			
			var user = new StackMob.User({ username: $('#email').val()});
		alert( $('#email').val());
			user.forgotPassword({
			  success: function(model, result, options) {alert('Please Check your email for your temporary password');},
			  error: function(model, result, options) {alert(result);}
			});
		});
	}
);