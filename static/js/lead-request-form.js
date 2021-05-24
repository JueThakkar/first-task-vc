$("#VerifyMblNumBtn").click(function(){
    var verify = "f";
    // event.preventDefault();
    $("#VerifyMobileNumSpinner").show();
    if($("#OtpNum").val() != ""){
        $("#VerifyMblNumErr").show();
        $("#VerifyMblNumErr").html("Please Enter OTP Number!");
        if($("#OtpNum").val() != "123456"){
            $("#VerifyMblNumErr").show();
            $("#VerifyMblNumErr").html("Please Enter Valide OTP!");
            verify = "f";
        }else {
            $("#VerifyMblNumErr").hide();
            $("#VerifyMobileNumSpinner").hide();
            verify = "t";
        }
    }
    if (verify == "t"){
        $('#Verify-Mobile-Number').modal('hide');
        $("#FirstStep").hide();
        $("#SecondStep").show();
    }
});

// Get few fields from DataBase
// on Loan Type change event
$("#LoanProductDiv").on('change', function(){
    var loanTypeId = $('#LnProdt').val();
    var urlStr = window.location.href ;
    var urlSpiltStr = urlStr.split("/")
    var instName = urlSpiltStr[4]

    $.ajax({
        method: 'GET',
        url: '/get-lead-roi-value?loanTypeId='+loanTypeId+'&bankName='+instName,
      data: $(this).serialize(),
      error: function(xhr, status, err) {},
      success: function(result) {
        $("#processing").hide();
        if(result.s.c == 0) {
          if(result.d.RoiData.RoiRate >0){
            $('#interest').val(result.d.RoiData.RoiRate);
            $('#interest1').val(result.d.RoiData.RoiRate);
          } else {
            $('#interest').val("10");
            $('#interest1').val("10");
          }
          if(result.d.ProcessingFee.ProcessingFee > 0){
              $("#ProcessingFee").val(result.d.ProcessingFee.ProcessingFee);
          }else{
              $("#ProcessingFee").val("0.5");
          }
        }
      }
    });
});

// Mobile Number Validation
$("#MobileNum").keyup(function (e) {
    var mobile = $.trim($(this).val());
    if (mobile != "") {
      var regx = /^[5-9]\d{9}$/;
      if (!regx.test(mobile)) {
        $("#pherror").show();
        $("#pherror").html("(Mobile no. start with 5/6/7/8/9.)");
        phCheckFlg = true;
        return;
      } else {
        phCheckFlg = false;
        $("#pherror").hide();
      }
    }
  });

// Display Mobile Number in Modal
$("#JumpToVerification").click(function(){
    if($("#MobileNum").val() != ""){
        $("#DispMobileNum").html("+91 - "+$("#MobileNum").val());
    }
    
});

// Click on 2nd step Previous Button 
// Go To 1st Step
$("#JumpToFirstStep").click(function(){
    $("#SecondStep").hide();
    $("#FirstStep").show();
    
});

// Click on 2nd step Next Button
// Go To 3rd Step
$("#JumpToThirdStep").click(function(){
    $("#SecondStep").hide();
    $("#ThirdStep").show();
});

// Click on 3rd Step Previous Button
// Go To 2nd Step
$("#JumpToSecondStep").click(function(){
    $("#ThirdStep").hide();
    $("#SecondStep").show();
});

// Add Hedaing text
$('#LoanProductDiv').on('change', function() {
  var LoanProduct = $("#LnProdt option:selected").text();
  $(".Heading").append(LoanProduct);
});

function showpay() {
    var loanamt = $('#loanAmt').val();
    // var loanmnth = $('#LoanMnth').val();
    var loanmnth = $("#LoanMnth option:selected").text();
    var roi = $('#interest').val();

      if ((loanamt == null || loanamt.length == 0) || (loanmnth == null || loanmnth.length == 0) &&
        (roi == null || roi.length == 0)) {
        $('#EMI').val("Incomplete data");
      } else {
        var princ = parseFloat(loanamt);
        var term = parseFloat(loanmnth);
        var roival = parseFloat(roi)
        var intr = roival / 1200;
       
          var emiCal = princ * intr / (1 - (Math.pow(1 / (1 + intr), term)));
        var finalEMIVal = emiCal.toFixed(0); // to disaply the fixed flaot numbers
        $('#TotalPayout').val(finalEMIVal);
      }
  }

// Reset Val
$("#ResetInterestCal").click(function(){
    $('#loanAmt').val("");
    $('#loanMnth').val("");
    $('#interest').val("");
    $("#TotalPayout").val("");
});

// $(document).ready(function() {
$(function() {
  // Cehck Radiobutton Value and show hide some information 
  // based on customer type
  $('input[type="radio"]').click(function(){
    if ($("input[name='CustTypeCheck']:checked").val() == 'exisingCustomer')
    {
        $("#CustAccType").show();
        $("#CustAccNum").show();
    }
    if ($("input[name='CustTypeCheck']:checked").val() == 'newCustomer')
    {
        $("#CustAccType").hide();
        $("#CustAccNum").hide();
    }
  });
  
});