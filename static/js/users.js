var $table = $('#table');

// queryParams to get the value like limits search and offset value
function queryParams(p) {
  var params = {};
  for (i in p) {
    if (p[i]) {
      params[i] = p[i];
    }
  }
  $('#toolbar').find('input[name]').each(function() {
    params[$(this).attr('name')] = $(this).val();
  });
  return params;
}

// Edit formatter for edit, delete options
function editFormatter(value, row) {
  return "<a title='Edit' href='#' class='txtedit' data-toggle='modal' data-target='#Edit-modal'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Change Password' href='#' class='changepwd' data-toggle='modal' data-target='#Password-modal'><i class='fa fa-key fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delUser' data-toggle='modal' data-target='#Delete-modal'><i class='fa fa-trash-o fa-fw'></i></a>"
}

function roleFormatter(value, row) {
  var role = "";
  if(row.Role == "Branch_Loan_Officer") {
    role = "Branch Loan Officer";
  } else if (row.Role == "Branch_Loan_Manager") {
    role = "Branch Loan Manager";
  } else if (row.Role == "Admin") {
    role = "Admin";
  } else if (row.Role == "HO_Admin") {
    role = "HO Admin";
  } else if (row.Role=="Executive_Committee_SPOC") {
    role = "Executive Committee SPOC";
  } else if (row.Role=="HO_Loan_Appraisal") {
    role = "HO Loan Appraisal"
  } else if (row.Role=="HO_Loan_Manager") {
    role = "HO Loan Manager"
  } else if (row.Role=="Mobile_Loan_Officer") {
    role = "Mobile Loan Officer"
  } else if (row.Role=="Web_Loan_Officer") {
    role = "Web Loan Officer"
  } else if (row.Role=="General_Manager") {
    role = "General Manager";
  } else if (row.Role=="Loan_Recovery_Officer") {
    role = "Loan Recovery Officer";
  } else if (row.Role=="Field_Officer") {
    role = "Field Officer";
  } else if (row.Role=="Sr_Manager_Retail_Loan") {
    role = "Sr Manager Retail Loan";
  } else if (row.Role=="Manager_Retail_Loan") {
    role = "Manager Retail Loan";
  } else if (row.Role=="AGM_Finance") {
    role = "AGM Finance";
  } else if (row.Role=="AGM_Banking") {
    role = "AGM Banking";
  } else if (row.Role=="AGM_Retail") {
    role = "AGM Retail";
  } else if (row.Role=="HO_Loan_Officer") {
    role = "HO Loan Officer";
  } else if (row.Role=="Senior_Officer") {
    role = "Senior Officer";
  } else if (row.Role=="Senior_Manager") {
    role = "Senior Manager";
  } else if (row.Role=="Junior_Officer") {
    role = "Junior Officer";
  } else if (row.Role=="Ho_Loan_Clerk") {
    role = "Ho Loan Clerk";
  } else if (row.Role=="CEO") {
    role = "CEO";
  }
  
  return role;
}

// Action events for the edit and delete option
window.actionEvents = {
    'click .txtedit': function (e, value, row, index) {
        // assgin input data to modal pop
        $('#Euid').val(row.ID);
        $('#Eemail').val(row.Email);
        $('#Efname').val(row.Firstname);
        $('#Elname').val(row.Lastname);
        $('#Ecuid').val(row.CKycUserId);
        $('div#divErle select').val(row.Role); // selelct role
        $('div#divEbranchname select').val(row.BranchId); //select barnch name option
        $('#EckycRcode').val(row.CKycRegionCode);
        $('#EckycBcode').val(row.CKycBranchCode);
        $('#EEmpCode').val(row.EmpCode);
        if(row.IsLocked == "Y") {
          $('.ISLOCKED').attr('checked', true);
        } else if (row.IsLocked == "N"){
          $('.ISLOCKED').attr('checked', false);
        }
    },
    'click .delUser': function (e, value, row, index) {
        // assgin input data to modal pop
        $('#deluid').val(row.ID);
    },
    'click .changepwd': function(e, value, row, index) {
      // assgin input data to modal pop
      $('#puserid').val(row.ID);
    }
};

$(function () {
    // alphanumeric key
    $("#Acuid").keyup(function(e){
        var str = $.trim( $(this).val() );
        if( str != "" ) {
          var regx = /^[A-Za-z0-9]+$/;
          if (!regx.test(str)) {
            $("#Acuidinfo").show();
            $("#Acuidinfo").html("Only letters and numbers allowed (e.g. IRA000123).");
            return;
          }else {
            $("#Acuidinfo").hide();
          }
        }
    });

    $("#Ecuid").keyup(function(e){
        var str = $.trim( $(this).val() );
        if( str != "" ) {
          var regx = /^[A-Za-z0-9]+$/;
          if (!regx.test(str)) {
            $("#Ecuidinfo").show();
            $("#Ecuidinfo").html("Only letters and numbers allowed (e.g. IRA000123).");
            return;
          }else {
            $("#Ecuidinfo").hide();
          }
        }
    });

    // check email exist or not
    // checkMailStatus();
    // function checkMailStatus(){
    $("#Aemail").keyup(function(e) {
      var email = $("#Aemail").val();
      var cname = $("#Acname").val();
      var url;
      if (cname != "" || cname != "undefined") {
        url = '/check-email-status?email='+email+'&cname='+cname;
      }else {
        url = '/check-email-status?email='+email
      }
      $.ajax({
        method: 'POST',
        url: url,
        data: $(this).serialize(),
        error: function(xhr, status, err) {
        },
        success: function(result) {
          if(result.s.c == 1) {
            $('#AemailSuccess').hide();
            $('#AemailError').show();
            $('#AemailError').html(result.s.m);
            $('#EmailResp').val("error");
          }else {
            $('#AemailError').hide();
            $('#AemailSuccess').show();
            $('#AemailSuccess').html(result.m);
            $('#EmailResp').val("success");
          }
        }
      });
    });

    // add-user
    $('#formUser1').submit(function(event) {
      event.preventDefault();

      // Field Validation for browsers not supporting html5 required attribute
      // fix for IE < 10
      $("#formUser1 [required]").each(function(index) {
        if($(this).val().length <= 0) {
          $(this).css({ "border-color":"red" });
        }
      });

      // $('#AcuidError').hide();
      // $("#divpwd").hide();

      // email error checking
      if ($('#EmailResp').val() == "error") {
        $('#AemailError').hide();
        $('#divAemailError').addClass("has-danger");
        $('#AcuidError').show();
        $('#AcuidError').html($('#AemailError').text());
        return;
      }

      // check password minlength
      if($("#pwd").val().length < 6) {
        $("#divaddpwdminlen").show();
        return;
      }

      // match password
      if ($("#pwd").val() != $("#confirmpwd").val()) {
        $("#divpwd").show();
        return;
      }

      //alphanumeric
      var str = $("#Acuid").val();
      if(str != "" ) {
        var regx = /^[A-Za-z0-9]+$/;
        if (!regx.test(str)) {
          $("#Acuidinfo").show();
          $("#Acuidinfo").html("Only letters and numbers allowed (e.g. IRA000123).");
          return;
        }else {
          $("#Acuidinfo").hide();
        }
      }

      $.ajax({
        method: 'POST',
        url: '/add-update-user',
        data: $(this).serialize(),
        error: function(xhr, status, err) {
        },
        success: function(result) {
          if(result.s.c == 1) {
            $('#AcuidError').show();
            $('#AcuidError').html(result.s.m)
          }else {
            $('#AcuidError').hide();
            window.location.href = "/users"
          }
        }
      });
    });

    // update-user
    $('#formUser2').submit(function(event) {
      event.preventDefault();

      // Field Validation for browsers not supporting html5 required attribute
      // fix for IE < 10
      $("#formUser2 [required]").each(function(index) {
        if($(this).val().length <= 0) {
          $(this).css({ "border-color":"red" });
        }
      });

      //alphanumeric
      var str = $("#Ecuid").val();
      if(str != "" ) {
        var regx = /^[A-Za-z0-9]+$/;
        if (!regx.test(str)) {
          $("#Ecuidinfo").show();
          $("#Ecuidinfo").html("Only letters and numbers allowed (e.g. IRA000123).");
          return;
        }else {
          $("#Ecuidinfo").hide();
        }
      }

      $.ajax({
        method: 'POST',
        url: '/add-update-user',
        data: $(this).serialize(),
        error: function(xhr, status, err) {
        },
        success: function(result) {
          if(result.s.c == 1) {
            $('#EcuidError').show();
            // $('#divemailError').addClass("has-danger");
            $('#EcuidError').html(result.s.m);
          }else {
            $('#EcuidError').hide();
            // $('#divemailError').removeClass("has-danger");;
            window.location.href = "/users";
          }
        }
      });
    });

    // Change password of user
    $('#formPassword').submit(function(event) {
      event.preventDefault();

      // Field Validation for browsers not supporting html5 required attribute
      // fix for IE < 10
      $("#formPassword [required]").each(function(index) {
        if($(this).val().length <= 0) {
          $(this).css({ "border-color":"red" });
        }
      });

      var id = $('#puserid').val();
      var pwd =$('#newpwd').val();

      // check password minlength
      if(pwd.length < 6) {
        $("#divpwdminlen").show();
        return;
      }

      // match password
      if ($("#newpwd").val() != $("#cnfirmpwd").val()) {
        $("#divchangepwd").show();
        return;
      }

      $.ajax({
        method: 'POST',
        url: '/change-password?id='+ id + '&password=' + pwd,
        data: $(this).serialize(),
        error: function(xhr, status, err) {
        },
        success: function(result) {
          window.location.href = "/users"
        }
      });
    });

    //Delete user
    var $deleteUser = $('.deleteUser');
    $deleteUser.click(function() {
      var id = $('#deluid').val();

      $.ajax({
        method: 'POST',
        url: '/delete-user?id='+id,
        data: $(this).serialize(),
        error: function(xhr, status, err) {
        },
        success: function(result) {
          window.location.href = "/users"
        }
      });
    });

    // displaying password on hover
    $('#showpwd, #showchangepwd').hover(function () {
        $('#pwd, #confirmpwd, #newpwd, #cnfirmpwd').attr('type', 'text');
      }, function () {
        $('#pwd, #confirmpwd, #newpwd, #cnfirmpwd').attr('type', 'password');
      }
    );

    $('.refreshApage').click(function() {
        window.location = '/users'; //will redirect to your batches page
    })
});
