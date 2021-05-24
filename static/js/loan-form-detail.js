// Table related script
var $table = $('#Table');
var loanId = $('#hLoanId').val();
var accessFlg = $('#NAFlg').val();
var disableAppraisal = $('#DisableAppraisal').val();
var LoanStatusVal = $('#loan-status').val();
var loanDuplicateFlg = $('#loan-duplicate-flg').val();
var interestTypeForFormula = $('#income-formula').val();
var applicantAge = $('#appliacantAge').val();
var applicantID = $('#applicantID').val();
var SLPFlag = $('#slpFlag').val();
var loanAmt = $('#LoanAmt').val();
var disableAppraisalApproveReject = $('#disableAppraisalApproveReject').val();
var loan_category = $('#loan-category').val();
var loanType = $('#loan-type').val();
var cbsVal = $('#cbs').val();
// console.log("cbsVal",cbsVal);

//Hide for Historical data
//Change while GSC Bank migration
if (cbsVal == "cbs") {
    $("#divEligible").hide();
    $("#Print-Letter").attr('disabled', 'disabled');
} else {
    $("#divEligible").show();
    $("#Print-Letter").removeAttr('disabled');
}

// console.log(SLPFlag);
var tableparams = {};

//For Applicant Mobile number should start with only 7,8,9
$("#PhNo").keyup(function(e) {
    var mobile = $.trim($(this).val());
    if (mobile != "") {
        var regx = /^[6-9]\d{9}$/;
        if (!regx.test(mobile)) {
            $("#pherror").show();
            $("#pherror").html("(Mobile no. start with 6/7/8/9.)");
            phCheckFlg = true;
            return;
        } else {
            phCheckFlg = false;
            $("#pherror").hide();
        }
    }
});

//For Second Co-Applicant Mobile number should start with only 7,8,9
$("#CoApp1PhNo").keyup(function(e) {
    var mobile = $.trim($(this).val());
    if (mobile != "") {
        var regx = /^[6-9]\d{9}$/;
        if (!regx.test(mobile)) {
            $("#CoApp1pherror").show();
            $("#CoApp1pherror").html("(Mobile no. start with 6/7/8/9.)");
            coPhCheckFlg = true;
            return;
        } else {
            coPhCheckFlg = false;
            $("#CoApp1pherror").hide();
        }
    }
});

//For First Co-Applicant Mobile number should start with only 7,8,9
$("#CoApp2PhNo").keyup(function(e) {
    var mobile = $.trim($(this).val());
    if (mobile != "") {
        var regx = /^[6-9]\d{9}$/;
        if (!regx.test(mobile)) {
            $("#CoApp2pherror").show();
            $("#CoApp2pherror").html("(Mobile no. start with 6/7/8/9.)");
            coPhCheckFlg = true;
            return;
        } else {
            coPhCheckFlg = false;
            $("#CoApp2pherror").hide();
        }
    }
});

//For Guarantor Mobile number should start with only 7,8,9
$("#Gmbl").keyup(function(e) {
    var mobile = $.trim($(this).val());
    if (mobile != "") {
        var regx = /^[6-9]\d{9}$/;
        if (!regx.test(mobile)) {
            $("#GmblError").show();
            $("#GmblError").html("(Mobile no. start with 6/7/8/9.)");
            phCheckFlg = true;
            return;
        } else {
            phCheckFlg = false;
            $("#GmblError").hide();
        }
    }
});

//For Guarantor Mobile number should start with only 7,8,9
$("#EGmbl").keyup(function(e) {
    var mobile = $.trim($(this).val());
    if (mobile != "") {
        var regx = /^[6-9]\d{9}$/;
        if (!regx.test(mobile)) {
            $("#EGmblError").show();
            $("#EGmblError").html("(Mobile no. start with 6/7/8/9.)");
            phCheckFlg = true;
            return;
        } else {
            phCheckFlg = false;
            $("#EGmblError").hide();
        }
    }
});

//Pan Format Checking For Applicant (i.e First 5char+4number+1char. Ex: ASDFG7890Q)
$("#PanNo").keyup(function(e) {
    var panStr = $.trim($(this).val());
    if (panStr != "") {
        var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
        if (!regx.test(panStr)) {
            $("#panError").show();
            $("#panError").html("(Enter Valid Pan Number.)");
            panCheckFlg = true;
            return;
        } else {
            panCheckFlg = false;
            $("#panError").hide();
        }
    }
});

//Pan Format Checking For First Co-Applicant (i.e First 5char+4number+1char. Ex: ASDFG7890Q)
$("#CoApp1PanNo").keyup(function(e) {
    var panStr = $.trim($(this).val());
    if (panStr != "") {
        var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
        if (!regx.test(panStr)) {
            $("#CoApp1panError").show();
            $("#CoApp1panError").html("(Enter Valid Pan Number.)");
            panCheckFlg = true;
            return;
        } else {
            panCheckFlg = false;
            $("#CoApp1panError").hide();
        }
    }
});

//Pan Format Checking For second Co-Applicant (i.e First 5char+4number+1char. Ex: ASDFG7890Q)
$("#CoApp2PanNo").keyup(function(e) {
    var panStr = $.trim($(this).val());
    if (panStr != "") {
        var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
        if (!regx.test(panStr)) {
            $("#CoApp2panError").show();
            $("#CoApp2panError").html("(Enter Valid Pan Number.)");
            panCheckFlg = true;
            return;
        } else {
            panCheckFlg = false;
            $("#CoApp2panError").hide();
        }
    }
});

//Pan Format Checking - Add ID Proof Information
$("#AdocNum").keyup(function(e) {
    var idType = $('#ADocProof').find('option:selected').attr("name");
    // console.log("idType", idType);
    if (idType.toLowerCase().indexOf("pan") != -1) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            $("#AdocNum").attr('maxlength', '10');
            $("#AdocNum").css('text-transform', 'uppercase');
            if (!regx.test(panStr)) {
                $("#AdocNumPanError").show();
                $("#AdocNumPanError").html("(Enter Valid Pan Number.)");
                panCheckFlg = true;
                return;
            } else {
                panCheckFlg = false;
                $("#AdocNumPanError").hide();
            }
        }
    } else if (idType.toLowerCase().indexOf("aadhar") != -1) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            $("#AdocNum").attr('maxlength', '12');
            if (($("#AdocNum").val().length) < 12) {
                $("#AdocNumPanError").show();
                $("#AdocNumPanError").html("(Enter Valid Aadhar Number.)");
                CheckFlg = true;
                return;
            } else {
                CheckFlg = false;
                $("#AdocNumPanError").hide();
            }
        }
    } else {
        $("#AdocNum").removeAttr('style');
        $("#AdocNum").attr('maxlength', '20');
        $("#AdocNumPanError").hide();
    }
});

//Pan Format Checking - Edit ID Proof Information
$("#EdocNum").keyup(function(e) {
    var idType = $('#EDocProof').find('option:selected').attr("name");
    if (idType.toLowerCase().indexOf("pan") != -1) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            $("#EdocNum").attr('maxlength', '10');
            $("#EdocNum").css('text-transform', 'uppercase');
            if (!regx.test(panStr)) {
                $("#EdocNumPanError").show();
                $("#EdocNumPanError").html("(Enter Valid Pan Number.)");
                panCheckFlg = true;
                return;
            } else {
                panCheckFlg = false;
                $("#EdocNumPanError").hide();
            }
        }
    } else if (idType.toLowerCase().indexOf("aadhar") != -1) {
        if (panStr != "") {
            $("#EdocNum").attr('maxlength', '12');
            if (($("#EdocNum").val().length) < 12) {
                $("#EdocNumPanError").show();
                $("#EdocNumPanError").html("(Enter Valid Aadhar Number.)");
                CheckFlg = true;
                return;
            } else {
                CheckFlg = false;
                $("#EdocNumPanError").hide();
            }
        }
    } else {
        $("#EdocNum").removeAttr('style');
        $("#EdocNum").attr('maxlength', '20');
        $("#EdocNumPanError").hide();
    }
});

//Pan Format Checking - Add ID Proof Detail (Guarantor)
$("#AGIddocNum").keyup(function(e) {
    var idType = $('#AGIdDocProof').find('option:selected').attr("name");
    if (idType.toLowerCase().indexOf("pan") != -1) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            $("#AGIddocNum").attr('maxlength', '10');
            $("#AGIddocNum").css('text-transform', 'uppercase');
            if (!regx.test(panStr)) {
                $("#AGIddocNumPanError").show();
                $("#AGIddocNumPanError").html("(Enter Valid Pan Number.)");
                panCheckFlg = true;
                return;
            } else {
                panCheckFlg = false;
                $("#AGIddocNumPanError").hide();
            }
        }
    } else if (idType.toLowerCase().indexOf("aadhar") != -1) {
        if (panStr != "") {
            $("#AGIddocNum").attr('maxlength', '12');
            if (($("#AGIddocNum").val().length) < 12) {
                $("#AGIddocNumPanError").show();
                $("#AGIddocNumPanError").html("(Enter Valid Aadhar Number.)");
                CheckFlg = true;
                return;
            } else {
                CheckFlg = false;
                $("#AGIddocNumPanError").hide();
            }
        }
    } else {
        $("#AGIddocNum").removeAttr('style');
        $("#AGIddocNum").attr('maxlength', '20');
        $("#AGIddocNumPanError").hide();
    }
});

//Pan Format Checking - Edit ID Proof Detail (Guarantor)
$("#EGIddocNum").keyup(function(e) {
    var idType = $('#EGIdDocProof').find('option:selected').attr("name");
    if (idType.toLowerCase().indexOf("pan") != -1) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            var regx = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            $("#EGIddocNum").attr('maxlength', '10');
            $("#EGIddocNum").css('text-transform', 'uppercase');
            if (!regx.test(panStr)) {
                $("#EGIddocNumPanError").show();
                $("#EGIddocNumPanError").html("(Enter Valid Pan Number.)");
                panCheckFlg = true;
                return;
            } else {
                panCheckFlg = false;
                $("#EGIddocNumPanError").hide();
            }
        }
    } else if (idType.toLowerCase().indexOf("aadhar") != -1) {
        if (panStr != "") {
            $("#EGIddocNum").attr('maxlength', '12');
            if (($("#EGIddocNum").val().length) < 12) {
                $("#EGIddocNumPanError").show();
                $("#EGIddocNumPanError").html("(Enter Valid Aadhar Number.)");
                CheckFlg = true;
                return;
            } else {
                CheckFlg = false;
                $("#EGIddocNumPanError").hide();
            }
        }
    } else {
        $("#EGIddocNum").removeAttr('style');
        $("#EGIddocNum").attr('maxlength', '20');
        $("#EGIddocNumPanError").hide();
    }
});

//Aadhar Card validation - Add Address Proof Detail
$("#AddocNum").keyup(function(e) {
    var idType = $('#AdDocProof').find('option:selected').attr("name");
    if (idType.toLowerCase().indexOf("aadhar") != -1) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            $("#AddocNum").attr('maxlength', '12');
            if (($("#AddocNum").val().length) < 12) {
                $("#AddocNumError").show();
                $("#AddocNumError").html("(Enter Valid Aadhar Number.)");
                CheckFlg = true;
                return;
            } else {
                CheckFlg = false;
                $("#AddocNumError").hide();
            }
        }
    } else {
        $("#AddocNumError").hide();
    }
});

//Aadhar Card validation - Edit Address Proof Detail
$("#EAddocNum").keyup(function(e) {
    var idType = $('#EAdDocProof').find('option:selected').attr("name");
    if (idType.toLowerCase().indexOf("aadhar") != -1) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            $("#EAddocNum").attr('maxlength', '12');
            if (($("#EAddocNum").val().length) < 12) {
                $("#EAddocNumError").show();
                $("#EAddocNumError").html("(Enter Valid Aadhar Number.)");
                CheckFlg = true;
                return;
            } else {
                CheckFlg = false;
                $("#EAddocNumError").hide();
            }
        }
    } else {
        $("#EAddocNum").removeAttr('maxlength', '12');
        $("#EAddocNumError").hide();
    }
});

//Aadhar Card validation - Add Address Proof Detail (Guarantor)
$("#AGAddrdocNum").keyup(function(e) {
    var idType = $('#AGAddrDocProof').find('option:selected').attr("name");
    if (idType.toLowerCase().indexOf("aadhar") != -1) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            $("#AGAddrdocNum").attr('maxlength', '12');
            if (($("#AGAddrdocNum").val().length) < 12) {
                $("#AGAddrdocNumError").show();
                $("#AGAddrdocNumError").html("(Enter Valid Aadhar Number.)");
                CheckFlg = true;
                return;
            } else {
                CheckFlg = false;
                $("#AGAddrdocNumError").hide();
            }
        }
    } else {
        $("#AGAddrdocNum").removeAttr('maxlength', '12');
        $("#AGAddrdocNumError").hide();
    }
});

//Aadhar Card validation - Edit Address Proof Detail (Guarantor)
$("#EGAddrdocNum").keyup(function(e) {
    var idType = $('#EGAddrDocProof').find('option:selected').attr("name");
    if (idType.toLowerCase().indexOf("aadhar") != -1) {
        var panStr = $.trim($(this).val());
        if (panStr != "") {
            $("#EGAddrdocNum").attr('maxlength', '12');
            if (($("#EGAddrdocNum").val().length) < 12) {
                $("#EGAddrdocNumError").show();
                $("#EGAddrdocNumError").html("(Enter Valid Aadhar Number.)");
                CheckFlg = true;
                return;
            } else {
                CheckFlg = false;
                $("#EGAddrdocNumError").hide();
            }
        }
    } else {
        $("#EGAddrdocNum").removeAttr('maxlength', '12');
        $("#EGAddrdocNumError").hide();
    }
});

function CurrencyDisplay(value, row) {
    // var money = value.split(".");
    // return money[0].split("").reverse().reduce(function(acc, num, i, orig) {
    //     return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    // }, "") ;

    if (value != "") {
        var money = parseFloat(value)
        return money.toLocaleString('en-IN');
    } else {
        return "-";
    }
}

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
    tableparams = params;
    return params;
}

function kycEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='editKYC' data-toggle='modal' data-target='#Edit-modal-kyc'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delKYC' data-toggle='modal' data-target='#Delete-modal-kyc'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function addProofEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='editAddrProof' data-toggle='modal' data-target='#Edit-modal-address'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delAddress' data-toggle='modal' data-target='#Delete-modal-address'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function financialEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='editFinDoc' data-toggle='modal' data-target='#Edit-modal-financial'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delFinDoc' data-toggle='modal' data-target='#Delete-modal-financial'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function propertyEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='editPropertyDoc' data-toggle='modal' data-target='#Edit-modal-property'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delProperty' data-toggle='modal' data-target='#Delete-modal-property'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function guarantorIdEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='editGidProof' data-toggle='modal' data-target='#Edit-modal-gid'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delGIdProof' data-toggle='modal' data-target='#Delete-modal-gid'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function guarantorAddrEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='editGAddrDoc' data-toggle='modal' data-target='#Edit-modal-gaddress'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delGAddrDoc' data-toggle='modal' data-target='#Delete-modal-gaddress'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function guarantorFinEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='editGFinDoc' data-toggle='modal' data-target='#Edit-modal-gfinancial'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delGFinDoc' data-toggle='modal' data-target='#Delete-modal-gfinancial'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>"
    }
}

function guarantorPropEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='editGProperty' data-toggle='modal' data-target='#Edit-modal-gproperty'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delGProperty' data-toggle='modal' data-target='#Delete-modal-gproperty'><i class='fa fa-trash-o fa-fw'></i></a>"
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function otherDocEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='editOtherDoc' data-toggle='modal' data-target='#Edit-modal-other'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delOtherDoc' data-toggle='modal' data-target='#Delete-modal-other'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function SanctionEditFormatter(value, row) {
    if (accessFlg == "true") { // && SLPFlag != "1"
        return "<a title='Edit' href='#' class='editSanctionRemark' data-toggle='modal' data-target='#Edit-modal-Remarks'><i class='fa fa-edit fa-fw'></i></a>"
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>"
    }
}

// added by saurabh
function checklisteditFormatter(value, row) {
    if (accessFlg == "true" && row.Status != "completed") {
        return "<a title='Edit' href='#' class='checklistedit' data-toggle='modal' data-target='#Edit-modal-checklist'><i class='fa fa-edit fa-fw'></i></a>" //&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delchecklist' data-toggle='modal' data-target='#Delete-checklist-modal'><i class='fa fa-trash-o fa-fw'></i></a>
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>"
    }
}

function mortgageEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='mortgageEdit' data-toggle='modal' data-target='#Edit-modal-mortgage'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delmortgage' data-toggle='modal' data-target='#Delete-modal-mortgage'><i class='fa fa-trash-o fa-fw'></i></a>";;
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function proofdocFileFormatter(value, row) {
    // if (accessFlg == "true") {
    return "<a href=/get-loan-uploaded-file/" + row.LoanId + "/" + row.LoanSignee + "/" + row.FileNames + " target=_blank>" + row.FileNames + "</a>";
    // }
}

function PrimaryDetailEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='primaryDetailEdit' data-toggle='modal' data-target='#Edit-modal-APDetail'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delprimaryDetail' data-toggle='modal' data-target='#Delete-modal-APDetail'><i class='fa fa-trash-o fa-fw'></i></a>";;
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function SecondaryDetailEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='secondaryDetailEdit' data-toggle='modal' data-target='#Edit-modal-ASDetail'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delsecondaryDetail' data-toggle='modal' data-target='#Delete-modal-ASDetail'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function GaurantoEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='gaurantorDetailEdit' data-toggle='modal' data-target='#Edit-modal-guarantor'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delGaurantorDetail' data-toggle='modal' data-target='#Delete-modal-guarantor'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function WorkingCapitalEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='workingCapitalDetailEdit' data-toggle='modal' data-target='#Edit-modal-working'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delWorkingCapital' data-toggle='modal' data-target='#Delete-modal-working'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function LoanDetailEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='loanDetailEdit' data-toggle='modal' data-target='#Edit-existing-loan-detail'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delLoanDetail' data-toggle='modal' data-target='#Delete-existing-loan-detail'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function BankingDetailEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>";
        } else {
            return "<a title='Edit' href='#' class='bankingDetailEdit' data-toggle='modal' data-target='#Edit-banking-detail'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delBankingDetail' data-toggle='modal' data-target='#Delete-banking-detail'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function authEditFormatter(value, row) {
    if (accessFlg == "true" && disableAppraisal == "false" && disableAppraisalApproveReject == "false") {
        return "<a title='Edit' href='#' class='appraisalAuthEdit' data-toggle='modal' data-target='#Edit-Appraisal-Auth-Info'><i class='fa fa-edit fa-fw'></i></a>";
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function RiskApprovalEditFormatter(value, row) {
    if (accessFlg == "true") {
        if (LoanStatusVal == "1") {
            return "<i class='fa fa-ban fa-fw text-danger'></i>"
        } else {
            return "<a title='Edit' href='#' class='riskApprovalDetailEdit' data-toggle='modal' data-target='#Edit-risk-approval'><i class='fa fa-edit fa-fw'></i></a>&nbsp;&nbsp;&nbsp;<a title='Delete' href='#' class='delRiskApproval' data-toggle='modal' data-target='#Delete-risk-approval'><i class='fa fa-trash-o fa-fw'></i></a>";
        }
    } else {
        return "<i class='fa fa-ban fa-fw text-danger'></i>";
    }
}

function ownershipFormatter(value, row) {
    var role = "";
    if (row.Ownership == "Branch_Loan_Officer") {
        role = "Branch Loan Officer";
    } else if (row.Ownership == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Ownership == "HO_Admin") {
        role = "HO Admin";
    } else if (row.Ownership == "Executive_Committee_SPOC") {
        role = "Executive Committee SPOC";
    } else if (row.Ownership == "HO_Loan_Appraisal") {
        role = "HO Loan Appraisal";
    } else if (row.Ownership == "HO_Loan_Manager") {
        role = "HO Loan Manager";
    } else if (row.Ownership == "Mobile_Loan_Officer") {
        role = "Mobile Loan Officer";
    } else if (row.Ownership == "Web_Loan_Officer") {
        role = "Web Loan Officer";
    } else if (row.Ownership == "General_Manager") {
        role = "General Manager";
    } else if (row.Ownership == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Ownership === "Loan_Recovery_Officer") {
        role = "Loan Recovery Officer";
    } else if (row.Ownership === "Sr_Manager_Retail_Loan") {
        role = "Sr Manager Retail Loan";
    } else if (row.Ownership === "Manager_Retail_Loan") {
        role = "Manager Retail Loan";
    } else if (row.Ownership === "AGM_Finance") {
        role = "AGM Finance";
    } else if (row.Ownership === "AGM_Banking") {
        role = "AGM Banking";
    } else if (row.Ownership === "AGM_Retail") {
        role = "AGM Retail";
    } else if (row.Ownership == "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.Ownership == "Senior_Officer") {
        role = "Senior Officer";
    } else if (row.Ownership == "Senior_Manager") {
        role = "Senior Manager";
    } else if (row.Ownership == "Junior_Officer") {
        role = "Junior Officer";
    } else if (row.Ownership == "Ho_Loan_Clerk") {
        role = "Ho Loan Clerk";
    } else if (row.Ownership == "CEO") {
        role = "CEO";
    }

    return role;
}

function StateDisplay(value, row) {
    var stateName = ""
    if (value == "AN") {
        stateName = "Andaman & Nicobar";
    } else if (value == "AP") {
        stateName = "Andhra Pradesh";
    } else if (value == "AR") {
        stateName = "Arunachal Pradesh";
    } else if (value == "AS") {
        stateName = "Assam";
    } else if (value == "BR") {
        stateName = "Bihar";
    } else if (value == "CH") {
        stateName = "Chandigarh";
    } else if (value == "CG") {
        stateName = "Chattisgarh";
    } else if (value == "DN") {
        stateName = "Dadra and Nagar Haveli";
    } else if (value == "DD") {
        stateName = "Daman & Diu";
    } else if (value == "DL") {
        stateName = "Delhi";
    } else if (value == "GA") {
        stateName = "Goa";
    } else if (value == "GJ") {
        stateName = "Gujarat";
    } else if (value == "HR") {
        stateName = "Haryana";
    } else if (value == "HP") {
        stateName = "Himachal Pradesh";
    } else if (value == "JK") {
        stateName = "Jammu & Kashmir";
    } else if (value == "JH") {
        stateName = "Jharkhand";
    } else if (value == "KA") {
        stateName = "Karnataka";
    } else if (value == "KL") {
        stateName = "Kerala";
    } else if (value == "LD") {
        stateName = "Lakshadweep";
    } else if (value == "MP") {
        stateName = "Madhya Pradesh";
    } else if (value == "MH") {
        stateName = "Maharashtra";
    } else if (value == "MN") {
        stateName = "Manipur";
    } else if (value == "ML") {
        stateName = "Meghalaya";
    } else if (value == "MZ") {
        stateName = "Mizoram";
    } else if (value == "NL") {
        stateName = "Nagaland";
    } else if (value == "OR") {
        stateName = "Orissa (Odisha)";
    } else if (value == "PY") {
        stateName = "Pondicherry (Puducherry)";
    } else if (value == "PB") {
        stateName = "Punjab";
    } else if (value == "RJ") {
        stateName = "Rajasthan";
    } else if (value == "SK") {
        stateName = "Sikkim";
    } else if (value == "TN") {
        stateName = "Tamil Nadu";
    } else if (value == "TS") {
        stateName = "Telangana";
    } else if (value == "TR") {
        stateName = "Tripura";
    } else if (value == "UP") {
        stateName = "Uttar Pradesh";
    } else if (value == "UA") {
        stateName = "Uttarakhand";
    } else if (value == "WB") {
        stateName = "West Bengal";
    }
    return stateName;
}

function req_optFormatter(value, row) {
    var roflag = "";
    if (value == "1") {
        roflag = "Mandatory";
    } else {
        roflag = "Optional";
    }
    return roflag;
}

// Date formatter
function dateFormatter(value, row) {
    var dt = new Date(value)
        // return dt.toLocaleString("en-IN");
        // IE Compatiblity
    if (!dt || isNaN(dt)) {
        value = value.replace(/-/g, '/').replace('T', ' ');
        dt = new Date(value);
    }
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
}

function assoDocFormatter(value, row) {
    return row.DocTypeName;
}

function otherDocFormatter(value, row) {
    var docType = row.OtherDocType
    if (docType == "Guarator_Waiver_Letter") {
        docType = "Guarator Waiver Letter"
    } else if (docType == "Other") {
        docType = "Other"
    }
    return docType;
}

function statusFormatter(value, row) {
    var status = row.Status;
    if (status == "pending") {
        status = "<span class='text-danger'>Pending</span>";
    } else if (status == "completed") {
        status = "<span class='text-success'>Completed</span>";
    }
    return status;
}

function sentByFormatter(value, row) {
    var name = "";
    var role = "";

    var fName = row.Firstname;
    var lName = row.Lastname;
    name = fName + " " + lName;

    if (row.Role == "Branch_Loan_Officer") {
        role = "Branch Loan Officer";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role == "HO_Admin") {
        role = "HO Admin";
    } else if (row.Role == "Executive_Committee_SPOC") {
        role = "Executive Committee SPOC";
    } else if (row.Role == "HO_Loan_Appraisal") {
        role = "HO Loan Appraisal";
    } else if (row.Role == "HO_Loan_Manager") {
        role = "HO Loan Manager";
    } else if (row.Role == "Mobile_Loan_Officer") {
        role = "Mobile Loan Officer";
    } else if (row.Role == "Web_Loan_Officer") {
        role = "Web Loan Officer";
    } else if (row.Role == "General_Manager") {
        role = "General Manager";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role === "Loan_Recovery_Officer") {
        role = "Loan Recovery Officer";
    } else if (row.Role === "Sr_Manager_Retail_Loan") {
        role = "Sr Manager Retail Loan";
    } else if (row.Role === "Manager_Retail_Loan") {
        role = "Manager Retail Loan";
    } else if (row.Role === "AGM_Finance") {
        role = "AGM Finance";
    } else if (row.Role === "AGM_Banking") {
        role = "AGM Banking";
    } else if (row.Role === "AGM_Retail") {
        role = "AGM Retail";
    } else if (row.Role == "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.Role == "Senior_Officer") {
        role = "Senior Officer";
    } else if (row.Role == "Senior_Manager") {
        role = "Senior Manager";
    } else if (row.Role == "Junior_Officer") {
        role = "Junior Officer";
    } else if (row.Role == "Ho_Loan_Clerk") {
        role = "Ho Loan Clerk";
    } else if (row.Role == "CEO") {
        role = "CEO";
    }

    return name + " (" + role + ")";
}

function AppCoAppNameFormatter(value, row) {
    var name = "";

    var fName = row.LoanSigneeName;
    var type = row.AppRoleType;

    if (row.AppRoleType == "Primary") {
        type = "Applicant"
    } else if (row.AppRoleType == "Secondary") {
        type = "Co-Applicant"
    } else if (row.AppRoleType == "Guarantor") {
        type = "Guarantor"
    }
    return fName + " (" + type + ")";
}

function reviewByFormatter(value, row) {
    var name = "";
    var role = "";

    var fName = row.ReviewFirstname;
    var lName = row.ReviewLastname;
    name = fName + " " + lName;

    if (row.ReviewRole == "Branch_Loan_Officer") {
        role = "Branch Loan Officer";
    } else if (row.ReviewRole == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.ReviewRole == "HO_Admin") {
        role = "HO Admin";
    } else if (row.ReviewRole == "Executive_Committee_SPOC") {
        role = "Executive Committee SPOC";
    } else if (row.ReviewRole == "HO_Loan_Appraisal") {
        role = "HO Loan Appraisal";
    } else if (row.ReviewRole == "HO_Loan_Manager") {
        role = "HO Loan Manager";
    } else if (row.ReviewRole == "Mobile_Loan_Officer") {
        role = "Mobile Loan Officer";
    } else if (row.ReviewRole == "Web_Loan_Officer") {
        role = "Web Loan Officer";
    } else if (row.ReviewRole == "General_Manager") {
        role = "General Manager";
    } else if (row.ReviewRole == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.ReviewRole === "Loan_Recovery_Officer") {
        role = "Loan Recovery Officer";
    } else if (row.Role === "Sr_Manager_Retail_Loan") {
        role = "Sr Manager Retail Loan";
    } else if (row.Role === "Manager_Retail_Loan") {
        role = "Manager Retail Loan";
    } else if (row.Role === "AGM_Finance") {
        role = "AGM Finance";
    } else if (row.Role === "AGM_Banking") {
        role = "AGM Banking";
    } else if (row.Role === "AGM_Retail") {
        role = "AGM Retail";
    } else if (row.Role === "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.Role == "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.Role == "Senior_Officer") {
        role = "Senior Officer";
    } else if (row.Role == "Senior_Manager") {
        role = "Senior Manager";
    } else if (row.Role == "Junior_Officer") {
        role = "Junior Officer";
    } else if (row.Role == "Ho_Loan_Clerk") {
        role = "Ho Loan Clerk";
    } else if (row.Role == "CEO") {
        role = "CEO";
    }

    return name + " (" + role + ")";
}

function createdByFormatter(value, row) {
    var name = "";
    var role = "";

    var fName = row.Firstname;
    var lName = row.Lastname;
    name = fName + " " + lName;

    if (row.Role == "Branch_Loan_Officer") {
        role = "Branch Loan Officer";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role == "HO Admin") {
        role = "HO Admin";
    } else if (row.Role == "Executive_Committee_SPOC") {
        role = "Executive Committee SPOC";
    } else if (row.Role == "HO_Loan_Appraisal") {
        role = "HO Loan Appraisal";
    } else if (row.Role == "HO_Loan_Manager") {
        role = "HO Loan Manager";
    } else if (row.Role == "Mobile_Loan_Officer") {
        role = "Mobile Loan Officer";
    } else if (row.Role == "Web_Loan_Officer") {
        role = "Web Loan Officer";
    } else if (row.Role == "General_Manager") {
        role = "General Manager";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role === "Loan_Recovery_Officer") {
        role = "Loan Recovery Officer";
    } else if (row.Role === "Sr_Manager_Retail_Loan") {
        role = "Sr Manager Retail Loan";
    } else if (row.Role === "Manager_Retail_Loan") {
        role = "Manager Retail Loan";
    } else if (row.Role === "AGM_Finance") {
        role = "AGM Finance";
    } else if (row.Role === "AGM_Banking") {
        role = "AGM Banking";
    } else if (row.Role === "AGM_Retail") {
        role = "AGM Retail";
    } else if (row.Role === "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.Role == "Senior_Officer") {
        role = "Senior Officer";
    } else if (row.Role == "Senior_Manager") {
        role = "Senior Manager";
    } else if (row.Role == "Junior_Officer") {
        role = "Junior Officer";
    } else if (row.Role == "Ho_Loan_Clerk") {
        role = "Ho Loan Clerk";
    } else if (row.Role == "CEO") {
        role = "CEO";
    }

    return name + " (" + role + ")";
}

function assignedToFormatter(value, row) {
    var name = "";
    var role = "";

    var fName = row.AssignedToFname;
    var lName = row.AssignedToLname;
    name = fName + " " + lName;

    if (row.AssignedToRole == "Branch_Loan_Officer") {
        role = "Branch Loan Officer";
    } else if (row.AssignedToRole == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.AssignedToRole == "HO_Admin") {
        role = "HO Admin";
    } else if (row.AssignedToRole == "Executive_Committee_SPOC") {
        role = "Executive Committee SPOC";
    } else if (row.AssignedToRole == "HO_Loan_Appraisal") {
        role = "HO Loan Appraisal";
    } else if (row.AssignedToRole == "HO_Loan_Manager") {
        role = "HO Loan Manager";
    } else if (row.AssignedToRole == "Mobile_Loan_Officer") {
        role = "Mobile Loan Officer";
    } else if (row.AssignedToRole == "Web_Loan_Officer") {
        role = "Web Loan Officer";
    } else if (row.AssignedToRole == "General_Manager") {
        role = "General Manager";
    } else if (row.AssignedToRole == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.AssignedToRole === "Loan_Recovery_Officer") {
        role = "Loan Recovery Officer";
    } else if (row.AssignedToRole === "Sr_Manager_Retail_Loan") {
        role = "Sr Manager Retail Loan";
    } else if (row.AssignedToRole === "Manager_Retail_Loan") {
        role = "Manager Retail Loan";
    } else if (row.AssignedToRole === "AGM_Finance") {
        role = "AGM Finance";
    } else if (row.AssignedToRole === "AGM_Banking") {
        role = "AGM Banking";
    } else if (row.AssignedToRole === "AGM_Retail") {
        role = "AGM Retail";
    } else if (row.AssignedToRole === "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.AssignedToRole == "Senior_Officer") {
        role = "Senior Officer";
    } else if (row.AssignedToRole == "Senior_Manager") {
        role = "Senior Manager";
    } else if (row.AssignedToRole == "Junior_Officer") {
        role = "Junior Officer";
    } else if (row.AssignedToRole == "Ho_Loan_Clerk") {
        role = "Ho Loan Clerk";
    } else if (row.AssignedToRole == "CEO") {
        role = "CEO";
    }

    return name + " (" + role + ")";
}

function reviewStatusFormatter(value, row) {
    var status = "";
    if (row.Status == 0) {
        status = "<span class='text-danger'><strong>No</strong></span>";
    } else if (row.Status == 1) {
        status = "<span class='text-success'><strong>Done</strong></span>";
    }

    return status;
}

function updatedByFormatter(value, row) {
    var name = "";
    var role = "";

    var fName = row.Firstname;
    var lName = row.Lastname;
    name = fName + " " + lName;

    if (row.Role == "Branch_Loan_Officer") {
        role = "Branch Loan Officer";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role == "HO_Admin") {
        role = "HO Admin";
    } else if (row.Role == "Executive_Committee_SPOC") {
        role = "Executive Committee SPOC";
    } else if (row.Role == "HO_Loan_Appraisal") {
        role = "HO Loan Appraisal";
    } else if (row.Role == "HO_Loan_Manager") {
        role = "HO Loan Manager";
    } else if (row.Role == "Mobile_Loan_Officer") {
        role = "Mobile Loan Officer";
    } else if (row.Role == "Web_Loan_Officer") {
        role = "Web Loan Officer";
    } else if (row.Role == "General_Manager") {
        role = "General Manager";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role === "Loan_Recovery_Officer") {
        role = "Loan Recovery Officer";
    } else if (row.Role === "Sr_Manager_Retail_Loan") {
        role = "Sr Manager Retail Loan";
    } else if (row.Role === "Manager_Retail_Loan") {
        role = "Manager Retail Loan";
    } else if (row.Role === "AGM_Finance") {
        role = "AGM Finance";
    } else if (row.Role === "AGM_Banking") {
        role = "AGM Banking";
    } else if (row.Role === "AGM_Retail") {
        role = "AGM Retail";
    } else if (row.Role === "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.Role == "Senior_Officer") {
        role = "Senior Officer";
    } else if (row.Role == "Senior_Manager") {
        role = "Senior Manager";
    } else if (row.Role == "Junior_Officer") {
        role = "Junior Officer";
    } else if (row.Role == "Ho_Loan_Clerk") {
        role = "Ho Loan Clerk";
    } else if (row.Role == "CEO") {
        role = "CEO";
    }

    if (name == " ") {
        return name;
    } else {
        return name + " (" + role + ")";
    }
}

function authNameFormatter(value, row) {
    var name = "";
    var role = "";
    if (row.Role == "Branch_Loan_Officer") {
        role = "Branch Loan Officer";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role == "HO_Admin") {
        role = "HO Admin";
    } else if (row.Role == "Executive_Committee_SPOC") {
        role = "Executive Committee SPOC";
    } else if (row.Role == "HO_Loan_Appraisal") {
        role = "HO Loan Appraisal";
    } else if (row.Role == "HO_Loan_Manager") {
        role = "HO Loan Manager";
    } else if (row.Role == "Mobile_Loan_Officer") {
        role = "Mobile Loan Officer";
    } else if (row.Role == "Web_Loan_Officer") {
        role = "Web Loan Officer";
    } else if (row.Role == "General_Manager") {
        role = "General Manager";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role === "Loan_Recovery_Officer") {
        role = "Loan Recovery Officer";
    } else if (row.Role == "Field_Officer") {
        role = "Field Officer";
    } else if (row.Role === "Sr_Manager_Retail_Loan") {
        role = "Sr Manager Retail Loan";
    } else if (row.Role === "Manager_Retail_Loan") {
        role = "Manager Retail Loan";
    } else if (row.Role === "AGM_Finance") {
        role = "AGM Finance";
    } else if (row.Role === "AGM_Banking") {
        role = "AGM Banking";
    } else if (row.Role === "AGM_Retail") {
        role = "AGM Retail";
    } else if (row.Role === "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.Role == "Senior_Officer") {
        role = "Senior Officer";
    } else if (row.Role == "Senior_Manager") {
        role = "Senior Manager";
    } else if (row.Role == "Junior_Officer") {
        role = "Junior Officer";
    } else if (row.Role == "Ho_Loan_Clerk") {
        role = "Ho Loan Clerk";
    } else if (row.Role == "CEO") {
        role = "CEO";
    }

    var fName = row.Firstname;
    var lName = row.Lastname;
    name = fName + " " + lName;

    return name + " (" + role + ")";
}

function authRoleFormatter(value, row) {
    var role = "";
    if (row.Role == "Branch_Loan_Officer") {
        role = "Branch Loan Officer";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role == "HO_Admin") {
        role = "HO Admin";
    } else if (row.Role == "Executive_Committee_SPOC") {
        role = "Executive Committee SPOC";
    } else if (row.Role == "HO_Loan_Appraisal") {
        role = "HO Loan Appraisal";
    } else if (row.Role == "HO_Loan_Manager") {
        role = "HO Loan Manager";
    } else if (row.Role == "Mobile_Loan_Officer") {
        role = "Mobile Loan Officer";
    } else if (row.Role == "Web_Loan_Officer") {
        role = "Web Loan Officer";
    } else if (row.Role == "General_Manager") {
        role = "General Manager";
    } else if (row.Role == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.Role === "Loan_Recovery_Officer") {
        role = "Loan Recovery Officer";
    } else if (row.Role === "Sr_Manager_Retail_Loan") {
        role = "Sr Manager Retail Loan";
    } else if (row.Role === "Manager_Retail_Loan") {
        role = "Manager Retail Loan";
    } else if (row.Role === "AGM_Finance") {
        role = "AGM Finance";
    } else if (row.Role === "AGM_Banking") {
        role = "AGM Banking";
    } else if (row.Role === "AGM_Retail") {
        role = "AGM Retail";
    } else if (row.Role === "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.Role == "Senior_Officer") {
        role = "Senior Officer";
    } else if (row.Role == "Senior_Manager") {
        role = "Senior Manager";
    } else if (row.Role == "Junior_Officer") {
        role = "Junior Officer";
    } else if (row.Role == "Ho_Loan_Clerk") {
        role = "Ho Loan Clerk";
    } else if (row.Role == "CEO") {
        role = "CEO";
    }

    return role;
}

function approveRejectFormatter(value, row) {
    var status = "";
    if (row.ApproveReject == "1") {
        status = "Approved";
    } else if (row.ApproveReject == "0") {
        status = "Rejected";
    }
    return status;
}

function appAuthDateFormatter(value, row) {
    var dt = new Date(value)
        // return dt.toLocaleString("en-IN");
        // IE Compatiblity
    if (!dt || isNaN(dt)) {
        value = value.replace(/-/g, '/').replace('T', ' ');
        dt = new Date(value);
    }
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
}

function approvedByFormatter(value, row) {
    var name = "";
    var role = "";

    var fName = row.ApprovedFname;
    var lName = row.ApprovedLname;
    name = fName + " " + lName;

    if (row.ApprovedRole == "Branch_Loan_Officer") {
        role = "Branch Loan Officer";
    } else if (row.ApprovedRole == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.ApprovedRole == "HO_Admin") {
        role = "HO Admin";
    } else if (row.ApprovedRole == "Executive_Committee_SPOC") {
        role = "Executive Committee SPOC";
    } else if (row.ApprovedRole == "HO_Loan_Appraisal") {
        role = "HO Loan Appraisal";
    } else if (row.ApprovedRole == "HO_Loan_Manager") {
        role = "HO Loan Manager";
    } else if (row.ApprovedRole == "Mobile_Loan_Officer") {
        role = "Mobile Loan Officer";
    } else if (row.ApprovedRole == "Web_Loan_Officer") {
        role = "Web Loan Officer";
    } else if (row.ApprovedRole == "General_Manager") {
        role = "General Manager";
    } else if (row.ApprovedRole == "Branch_Loan_Manager") {
        role = "Branch Loan Manager";
    } else if (row.ApprovedRole === "Loan_Recovery_Officer") {
        role = "Loan Recovery Officer";
    } else if (row.ApprovedRole === "Sr_Manager_Retail_Loan") {
        role = "Sr Manager Retail Loan";
    } else if (row.ApprovedRole === "Manager_Retail_Loan") {
        role = "Manager Retail Loan";
    } else if (row.ApprovedRole === "AGM_Finance") {
        role = "AGM Finance";
    } else if (row.ApprovedRole === "AGM_Banking") {
        role = "AGM Banking";
    } else if (row.ApprovedRole === "AGM_Retail") {
        role = "AGM Retail";
    } else if (row.ApprovedRole === "HO_Loan_Officer") {
        role = "HO Loan Officer";
    } else if (row.ApprovedRole == "Senior_Officer") {
        role = "Senior Officer";
    } else if (row.ApprovedRole == "Senior_Manager") {
        role = "Senior Manager";
    } else if (row.ApprovedRole == "Junior_Officer") {
        role = "Junior Officer";
    } else if (row.ApprovedRole == "Ho_Loan_Clerk") {
        role = "Ho Loan Clerk";
    } else if (row.ApprovedRole == "CEO") {
        role = "CEO";
    }

    return name + " (" + role + ")";
}

function catRoleFormatter(value, row) {
    var applicantType = row.ApplicantType;
    if (row.ApplicantType == "Primary") {
        applicantType = "Applicant"
    } else if (row.ApplicantType == "Secondary") {
        applicantType = "Co-Applicant"
    } else if (row.ApplicantType == "Guarantor") {
        applicantType = "Guarantor"
    }
    return applicantType;
}

// Formatters for Appraisal tab.
// To display Loan amount in word (Appraisal letter)
function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

function NameFormatter(value, row) {
    var applicantType = row.ApplicantType;
    var name = row.Name;
    if (row.ApplicantType == "Primary") {
        applicantType = "Applicant"
    } else if (row.ApplicantType == "Secondary") {
        applicantType = "Co-Applicant"
    } else if (row.ApplicantType == "Guarantor") {
        applicantType = "Guarantor"
    }
    return name + "(" + applicantType + ")";
}

function LoanAmount(value, row) {
    var loanAmt = "";
    var applicantType = row.ApplicantType;
    if (row.ApplicantType == "Primary") {
        loanAmt = parseFloat(row.LoanAmt).toLocaleString('en-IN');
    } else if (row.ApplicantType == "Secondary") {
        loanAmt = "-";
    } else if (row.ApplicantType == "Guarantor") {
        loanAmt = "-";
    }

    return loanAmt;
}

function LoanAmountToWord(value, row) {
    var loanAmt = row.LoanAmt;
    var applicantType = row.ApplicantType;
    var words = "";
    if (row.ApplicantType == "Primary") {
        loanAmt = row.LoanAmt;
        words = convertNumberToWords(loanAmt);
    } else if (row.ApplicantType == "Secondary") {
        loanAmt = "-";
        words = "-";
    } else if (row.ApplicantType == "Guarantor") {
        loanAmt = "-";
        words = "-";
    }
    return words;
}

function OtherLoanFormatter(value, row) {
    var otherLoan = row.OtherLoanEmiFlg;
    if (otherLoan == "1") {
        otherLoan = "Yes";
    } else {
        otherLoan = "No";
    }
    return otherLoan;
}

function AgeFormatter(value, row) {
    var age = row.Age;
    if (row.ApplicantType == "Primary") {
        age = row.Age;
    } else if (row.ApplicantType == "Secondary") {
        age = row.Age;
    } else if (row.ApplicantType == "Guarantor") {
        age = "-";
    }
    return age;
}

function CibilFormatter(value, row) {
    var score = row.CibilScore;
    if (row.ApplicantType == "Primary") {
        score = row.CibilScore;
    } else if (row.ApplicantType == "Secondary") {
        score = row.CibilScore;
    } else if (row.ApplicantType == "Guarantor") {
        score = "-";
    }
    return score;
}

function taskDesRemarksInfoFormatter(value, row) {
    var taskDesRemarksStr = "";
    if (row.TaskRemarks != "") {
        // var str = (row.TaskRemarks).replace(/\n/g, "<br/>");
        // console.log("row.TaskRemarks", str);
        // <a href="#" data-toggle="popover" title="Popover Header" data-content="Some content inside the popover">Toggle popover</a>
        taskDesRemarksStr = row.TaskName + "&nbsp;<a class='pop-info' data-toggle='popover' data-container='body' data-placement='top' title='" + row.TaskName + "' data-content='" + row.TaskRemarks + "'><i class='fa fa-info-circle fa-fw text-danger'></i></a>";
    } else {
        taskDesRemarksStr = row.TaskName;
    }
    return taskDesRemarksStr;
}

function bsUpdatedByFormatter(value, row) {
    var name = "";
    var fName = row.Firstname;
    var lName = row.Lastname;
    name = fName + " " + lName;
    return name;
}

function balanceSheetEditFormatter(value, row) {
    // return "<a title='Delete' href='#' class='delSectorOutlook' data-toggle='modal' data-target='#Delete-sector-outlook-modal'><i class='fa fa-trash-o fa-fw'></i></a>"
    return "<a title='Delete' href='#' class='delBakanceSheet' data-toggle='modal' data-target='#Delete-balance-sheet-modal'><i class='fa fa-trash-o fa-fw'></i></a>";
}

function balanceSheetFormatter(value, row) {
    if (accessFlg == "true") {
        return "<a href=/get-balance-sheet/" + "BalanceSheet/" + row.Year + "/" + row.FileName + " target=_blank>" + row.FileName + "</a>";
    }
}

// Staff field display hide function
// Fetch Staff related details when loan type contains staff / stf
function StaffFieldDisp() {
    if ((($('#plt option:selected').text().toLowerCase().indexOf("stf") != -1) ||
            ($('#plt option:selected').text().toLowerCase().indexOf("staff") != -1)) &&
        ($('#PersonalBusiness option:selected').val() == "personal_use")) {
        $("#StaffIndexNo").show();
        $("#StaffDesignation").show();
        $("#GStaffIndexNo").show();
        $("#GStaffDesignation").show();
        $("#EGStaffIndexNo").show();
        $("#EGStaffDesignation").show();
        $("#StaffJoinDate").show();
        $("#StaffRetireDate").show();
    } else {
        $("#StaffIndexNo").hide();
        $("#StaffDesignation").hide();
        $("#GStaffIndexNo").hide();
        $("#GStaffDesignation").hide();
        $("#EGStaffIndexNo").hide();
        $("#EGStaffDesignation").hide();
        $("#StaffJoinDate").hide();
        $("#StaffRetireDate").hide();
    }

     // for Staff Housing Loan
     if ((($('#plt option:selected').text().toLowerCase().indexOf("stf") != -1) ||
        ($('#plt option:selected').text().toLowerCase().indexOf("staff") != -1) &&
        ($('#plt option:selected').text().toLowerCase().indexOf("hous") != -1)) &&
        ($('#PersonalBusiness option:selected').val() == "personal_use")) {
            $("#divStaffHouse").show();
    } else {
        $("#divStaffHouse").hide();
    }

    // for Staff Housing Loan
    if ((($('#plt option:selected').text().toLowerCase().indexOf("stf") != -1) ||
        ($('#plt option:selected').text().toLowerCase().indexOf("staff") != -1) &&
        ($('#plt option:selected').text().toLowerCase().indexOf("vehicle") != -1)) &&
        ($('#PersonalBusiness option:selected').val() == "personal_use")) {
            $("#divStaffVehicle").show();
    } else {
            $("#divStaffVehicle").hide();
    }
}

// Action events for the edit and delete option
window.actionEvents = {
    'click .pop-info': function(e, value, row, index) {
        $('[data-toggle="popover"]').popover();
    },
    'click .checklistedit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#Eid').val(row.ID);
        $('#clistid').val(row.ChecklistTaskId)
        $('#EtaskDes').val(row.TaskName);
        $('div#divEreqopt select').val(row.TaskReqOptlFlg);
        $('div#divEOwnership select').val(row.Ownership);
        $('div#divEAssoDocType select').val(row.AssoDocType);
        $('div#divEStatus  select').val(row.Status);
        $('#ERemarks').val(row.Remarks);
    },
    'click .delchecklist': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#deluid').val(row.ID);
    },
    'click .editKYC': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#EIdProof').val(row.ID);
        $('#EdocNum').val(row.DocNumber);
        $('#EExpiryDate').val(row.ExpiryDate);
        $('div#divEname select').val(row.LoanSignee);
        $('div#divEFarmerName select').val(row.FarmerId)
        $('div#divEproof select').val(row.ProofType);
        $('div#divEDocProof select').val(row.DocType);
        if (row.FileNames == "") {
            $('#EUplDoc').text("No");
        } else {
            $('#EUplDoc').text(row.FileNames);
        }
    },
    'click .delKYC': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delIdProof').val(row.ID);
    },
    'click .editAddrProof': function(e, value, row, index) {
        $('#EAddrProofId').val(row.ID);
        $('div#divEAdname select').val(row.LoanSignee);
        $('div#divEFarmerName select').val(row.FarmerId);
        $('div#divEAdproof select').val(row.ProofType);
        $('div#divEAdDocProof select').val(row.DocType);
        $('#EAddocNum').val(row.DocNumber);
        $('#EAdExpiryDate').val(row.ExpiryDate);
        if (row.FileNames == "") {
            $('#EAdUplDoc').text("No");
        } else {
            $('#EAdUplDoc').text(row.FileNames);
        }
    },
    'click .delAddress': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delAddress').val(row.ID);
    },
    'click .editFinDoc': function(e, value, row, index) {
        $('#EAFinDocId').val(row.ID);
        $('div#divEFinName select').val(row.LoanSignee);
        $('div#divEFinFarmerName select').val(row.FarmerId);
        $('div#divEFinProof select').val(row.ProofType);
        $('div#divEFinDocProof select').val(row.DocType);
        $('#EFinDocYear').val(row.DocYear);
        if (row.FileNames == "") {
            $('#EFinDocUpldDoc').text("No");
        } else {
            $('#EFinDocUpldDoc').text(row.FileNames);
        }
    },
    'click .delFinDoc': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delFinDoc').val(row.ID);
    },
    'click .editPropertyDoc': function(e, value, row, index) {
        // $('div#divEProDocProof input[checkbox]').removeAttr('checked');
        $('#EProDocId').val(row.ID);
        $('div#divEProDocName select').val(row.LoanSignee);
        $('div#divEProDocName select').val(row.LoanSignee);
        $('div#divEProFarmerName select').val(row.FarmerId);
        //checkbox: dispalying checked
        var res = (row.DocType).split(",");
        for (i = 0; i < res.length; i++) {
            if (res[i] != null && res[i].length > 0) {
                $("#E" + res[i]).prop('checked', true);
            }
        }

        $('#EProDocYear').val(row.DocYear);
        if (row.FileNames == "") {
            $('#EProDocUpldDoc').text("No");
        } else {
            $('#EProDocUpldDoc').text(row.FileNames);
        }
    },
    'click .delProperty': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delProperty').val(row.ID);
    },
    'click .editGidProof': function(e, value, row, index) {
        $('#EGIdPid').val(row.ID);
        $('div#divEGIdName select').val(row.LoanSignee);
        $('div#divEGIdFName select').val(row.FarmerId);
        $('div#divEGIdproof select').val(row.ProofType);
        $('div#divEGIdDocProof select').val(row.DocType);
        $('#EGIddocNum').val(row.DocNumber);
        $('#EGIdExpiryDate').val(row.ExpiryDate);
        if (row.FileNames == "") {
            $('#EGIdUpldDoc').text("No");
        } else {
            $('#EGIdUpldDoc').text(row.FileNames);
        }
    },
    'click .delGIdProof': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delGIdProof').val(row.ID);
    },
    'click .editGAddrDoc': function(e, value, row, index) {
        $('#EGAddrPID').val(row.ID);
        $('div#divEGAddrName select').val(row.LoanSignee);
        $('div#divEGAddrFName select').val(row.FarmerId);
        $('div#divEGAddrproof select').val(row.ProofType);
        $('div#divEGAddrDocProof select').val(row.DocType);
        $('#EGAddrdocNum').val(row.DocNumber);
        $('#EGAddrExpiryDate').val(row.ExpiryDate);
        if (row.FileNames == "") {
            $('#EGAddrUpldDoc').text("No");
        } else {
            $('#EGAddrUpldDoc').text(row.FileNames);
        }
    },
    'click .delGAddrDoc': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delGAddrPID').val(row.ID);
    },
    'click .editGFinDoc': function(e, value, row, index) {
        $('#EFinDocId').val(row.ID);
        $('div#divEGFinDocName select').val(row.LoanSignee);
        $('div#divEGFinDocFName select').val(row.FarmerId);
        $('div#divEGFinProof select').val(row.ProofType);
        $('div#divEGFinDocProof select').val(row.DocType);
        $('#EGFinDocYear').val(row.DocYear);
        if (row.FileNames == "") {
            $('#EGFinDocUpldDoc').text("No");
        } else {
            $('#EGFinDocUpldDoc').text(row.FileNames);
        }
    },
    'click .delGFinDoc': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delGFid').val(row.ID);
    },
    'click .editGProperty': function(e, value, row, index) {
        $('#EGPropDocId').val(row.ID);
        $('div#divEGGPropDocName select').val(row.LoanSignee);
        $('div#divEGGPropDocFName select').val(row.FarmerId);
        $('div#divEGPropProof select').val(row.ProofType);
        // $('div#divEGPropDocProof select').val(row.DocType);
        //checkbox: dispalying checked
        var res = (row.DocType).split(",");
        for (i = 0; i < res.length; i++) {
            if (res[i] != null && res[i].length > 0) {
                $("#GE" + res[i]).prop('checked', true);
            }
        }
        $('#EGPropDocYear').val(row.DocYear);
        if (row.FileNames == "") {
            $('#EGPropDocUpldDoc').text("No");
        } else {
            $('#EGPropDocUpldDoc').text(row.FileNames);
        }
    },
    'click .delGProperty': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delGPropDoc').val(row.ID);
    },
    'click .editOtherDoc': function(e, value, row, index) {
        $('#EOtherdoc').val(row.ID);
        $('div#divEOtherDocName select').val(row.LoanSignee);
        $('div#divEOtherProof select').val(row.ProofType);
        $('div#divEOtherDocType select').val(row.OtherDocType);
        $('#EOtherRemarks').val(row.DocRemark);
        $('#EOtherDocUpldDoc').text(row.FileNames);
        if (row.FileNames == "") {
            $('#EOtherDocUpldDoc').text("No");
        } else {
            $('#EOtherDocUpldDoc').text(row.FileNames);
        }
    },
    'click .delOtherDoc': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delOtherDoc').val(row.ID);
    },
    'click .mortgageEdit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#EMid').val(row.ID);
        $('#EPropOwner').val(row.PropertyOwner);
        $('div#divEProType select').val(row.PropertyType);
        $('#EPropDetails').val(row.PropertyDetails);
        $('#EPropvalue').val(row.PropertyValue);
        $('#EPropSeller').val(row.Seller);
        $('#ELtv').val(row.Ltv);

        if ($('#EProType').val() == 'Vehicle') {
            $('#EdivOwner').hide();
            $('#EpropertyDetailLabel').hide();
            $('#EpropertyValLabel').hide();
            $('#EdivSeller').show();
            $('#EshowroomPriceLabel').show();
            $('#EPropvalue').attr("placeholder", "Enter Ex-Showroom Price");
            $('#EmakeModelLabel').show();
            $("#EPropDetails").attr("placeholder", "Enter Make and Model");
            $('#EdivProDetail').show();
            $('#EdivProVal').show();
        } else {
            $('#EdivOwner').show();
            $('#EpropertyDetailLabel').show();
            $('#EpropertyValLabel').show();
            $('#EdivProDetail').show();
            $('#EdivProVal').show();
            $('#EdivSeller').hide();
            $('#EshowroomPriceLabel').hide();
            $('#EPropvalue').attr("placeholder", "Enter Total Property Value");
            $('#EmakeModelLabel').hide();
            $("#EPropDetails").attr("placeholder", "Enter Property Details");
        }
        $('#EProType').on('change', function() {
            if (this.value == 'Vehicle') {
                $('#EdivOwner').hide();
                $('#EpropertyDetailLabel').hide();
                $('#EpropertyValLabel').hide();
                $('#EdivSeller').show();
                $('#EshowroomPriceLabel').show();
                $('#EPropvalue').attr("placeholder", "Enter Ex-Showroom Price");
                $('#EmakeModelLabel').show();
                $("#EPropDetails").attr("placeholder", "Enter Make and Model");
                $('#EdivProDetail').show();
                $('#EdivProVal').show();
            } else {
                $('#EdivOwner').show();
                $('#EpropertyDetailLabel').show();
                $('#EpropertyValLabel').show();
                $('#EdivProDetail').show();
                $('#EdivProVal').show();
                $('#EdivSeller').hide();
                $('#EshowroomPriceLabel').hide();
                $('#EPropvalue').attr("placeholder", "Enter Total Property Value");
                $('#EmakeModelLabel').hide();
                $("#EPropDetails").attr("placeholder", "Enter Property Details");
            }
        });
    },
    'click .delmortgage': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delMid').val(row.ID);
    },
    'click .primaryDetailEdit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#PDid').val(row.ID);
        $('#div#divEpdSigneeName select').val(row.LoanSignee);
        $('div#divEpdApplicantType select').val(row.ApplicantType);
        $('#EpdAge').val(row.Age);
        $('#EpdEdu').val(row.Education);
        $('#EpdWork').val(row.Work);
        $('div#divEpdDocName select').val(row.DocName);
        $('#EpdDocNum').val(row.DocValue);
    },
    'click .delprimaryDetail': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delPD').val(row.ID);
    },
    'click .secondaryDetailEdit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#SDid').val(row.ID);
        $('#div#divEsdSigneeName select').val(row.LoanSignee);
        $('div#divEsdApplicantType select').val(row.ApplicantType);
        $('#EsdFinancials').val(row.Financials);
        $('#EsdScore').val(row.CibilScore);
        $('div#EsdCibilChk select').val(row.CibilChk);
        $('div#EsdTransChk select').val(row.TransChk);
        $('div#EsdEquiChk select').val(row.EquiChk);
        $('div#divEsdChequeReturn select').val(row.ChequeReturns);
        $('#EsdRemark').val(row.Remark);
    },
    'click .delsecondaryDetail': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delSD').val(row.ID);
    },
    'click .gaurantorDetailEdit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#EGid').val(row.ID);
        $('#EGname').val(row.Name);
        $('#EGrelation').val(row.Relationship);
        $('#Eoccupation').val(row.Occupation);
        $('#EGmbl').val(row.Phone);
        $('#EGAnnualIncome').val(row.AnnualIncome);
        $('#EGMonthlyIncome').val(row.MnthlyIncome);
        $('#EGIdNumber').val(row.IdNumber);
        $('div#divAddressType select').val(row.AddressType);
        $('#EGAddress1').val(row.ResidenceAddress);
        $('#EGCity').val(row.City);
        $('div#divEGState select').val(row.State);
        $('#EGPin').val(row.PinCode);
        $("#EGPfINo").val(row.StaffPfIndex);
        $("#EGDesignation").val(row.StaffDesignation);
        $("div#divEGProType select").val(row.PropertyType)
        $("#EGProDetail").val(row.PropertyDetail)
    },
    'click .delGaurantorDetail': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delG').val(row.ID);
    },
    'click .workingCapitalDetailEdit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#EWid').val(row.ID);
        $('#EcapitalSurplus').val(row.WorkingCapitalSurplus);
        $('#Empbf').val(row.Mpbf);
        $('#Eturnover').val(row.NetTurnover);
        $('#Eremark').val(row.Remarks);
    },
    'click .delWorkingCapital': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delWC').val(row.ID);
    },
    'click .editSanctionRemark': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#sanctionid').val(row.ID);
        $('#EAdditionalSancTerm').val(row.AddSancTerm);
        $('#ESanctionRemarks').val(row.Remark);
        $('div#divRemarkBy select').val(row.RemarksBy);
        if (row.IsPostCheckTask == "Y") {
            $('.PostTask').attr('checked', true);
        } else if (row.IsPostCheckTask == "") {
            $('.PostTask').attr('checked', false);
        }
    },
    'click .loanDetailEdit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#EEid').val(row.ID);
        $('div#divExistingLoanSigneeName select').val(row.LoanSignee);
        $('#ELoanNum').val(row.LoanNum);
        $('#ELoanType').val(row.LoanType);
        $('#EFinancerName').val(row.FinancerName);
        $('#ELoanAmt').val(row.LoanAmt);
        $('#ETenure').val(row.Tenure);
        $('#EEmiPaid').val(row.PaidEmi);
        $('#EBounceEmi').val(row.BounceEmi);
        $('#EOutLoanAmt').val(row.OutstandingLoanAmt);
    },
    'click .delLoanDetail': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delEL').val(row.ID);
    },
    'click .bankingDetailEdit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#EBid').val(row.ID);
        $('#EbankName').val(row.BankName);
        $('div#divBankDetailSignee select').val(row.LoanSignee);
        $('div#divAccType select').val(row.AccType);
        $('#EYears').val(row.NumOfYears);
        $('#EAvgBal').val(row.AvgBal);
        $('#EMinBal').val(row.MinBal);
        $('#EMaxBal').val(row.MaxBal);
        $('#EbounceCheque').val(row.BounceCheques);
        $('#Etxns').val(row.NoOfTxns);
    },
    'click .delBankingDetail': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delBD').val(row.ID);
    },
    'click .appraisalAuthEdit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#LaonAuthPid').val(row.ID);
        var role = "";
        if (row.Role == "Branch_Loan_Officer") {
            role = "Branch Loan Officer";
        } else if (row.Role == "Branch_Loan_Manager") {
            role = "Branch Loan Manager";
        } else if (row.Role == "HO_Admin") {
            role = "HO Admin";
        } else if (row.Role == "Executive_Committee_SPOC") {
            role = "Executive Committee SPOC";
        } else if (row.Role == "HO_Loan_Appraisal") {
            role = "HO Loan Appraisal";
        } else if (row.Role == "HO_Loan_Manager") {
            role = "HO Loan Manager";
        } else if (row.Role == "Mobile_Loan_Officer") {
            role = "Mobile Loan Officer";
        } else if (row.Role == "Web_Loan_Officer") {
            role = "Web Loan Officer";
        } else if (row.Role == "General_Manager") {
            role = "General Manager";
        } else if (row.Role === "Loan_Recovery_Officer") {
            role = "Loan Recovery Officer";
        } else if (row.Role === "Field_Officer") {
            role = "Field Officer";
        } else if (row.Role === "Sr_Manager_Retail_Loan") {
            role = "Sr Manager Retail Loan";
        } else if (row.Role === "Manager_Retail_Loan") {
            role = "Manager Retail Loan";
        } else if (row.Role === "AGM_Finance") {
            role = "AGM Finance";
        } else if (row.Role === "AGM_Banking") {
            role = "AGM Banking";
        } else if (row.Role === "AGM_Retail") {
            role = "AGM Retail";
        } else if (row.Role === "HO_Loan_Officer") {
            role = "HO Loan Officer";
        } else if (row.Role == "Senior_Officer") {
            role = "Senior Officer";
        } else if (row.Role == "Senior_Manager") {
            role = "Senior Manager";
        } else if (row.Role == "Junior_Officer") {
            role = "Junior Officer";
        } else if (row.Role == "Ho_Loan_Clerk") {
            role = "Ho Loan Clerk";
        } else if (row.Role == "CEO") {
            role = "CEO";
        }

        $('#ERole').val(role);
        var name = row.Firstname + " " + row.Lastname;
        $('#EName').val(name);
        $('div#divEApproveReject select').val(row.ApproveReject);
        $('#EAppRemark').val(row.Remark);
        $("#ESancAmt").val(row.SancLoanAmt);
        $("#ESancInterest").val(row.SancLoanInterest);
        $("#ESancPeriod").val(row.SancLoanPeriod);
    },
    'click .riskApprovalDetailEdit': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#ERid').val(row.ID);
        $('#EParameters').val(row.Parameters);
        $('#EDescription').val(row.Description);
        $('#EEmpCode').val(row.EmpCode);
        $('#ERiskRemarks').val(row.Remarks);
        $('div#divECode select').val(row.Code);
        $('div#divEApprovedBy select').val(row.ApprovedBy);
    },
    'click .delRiskApproval': function(e, value, row, index) {
        // assgin input data to modal pop
        $('#delRA').val(row.ID);
    }
};

// Jue-18-07-2017 Validations for digits only
function val(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^\d*\.?\d*$/; // added this to accept decimal also
    if (!regex.test(key) && evt.keyCode != 8 && evt.keyCode != 9) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

// Dom Load, add, update, delete script
$(function() {
    // disable previous dates on datepicker - Sanction Date
    // var date = new Date();
    // date.setDate(date.getDate());
    var date = $('#loanSancDate').val();

    $('#sanc_date').datepicker({
        startDate: date
    });

    // This closes all popovers if you click anywhere except on a popover
    $('html').on('mouseup', function(e) {
        //did not click a popover toggle or popover
        if ($(e.target).data('toggle') !== 'popover' &&
            $(e.target).parents('.popover.in').length === 0) {
            $('[data-toggle="popover"]').popover('hide');
        }
    });

    if (($('#PersonalBusiness').val() == "personal_use") || ($('#PersonalBusiness').val() == "Personal")) {
        $('#personalLoan').show();
        StaffFieldDisp();
    } else {
        $('#personalLoan').hide();
        $('#CaptitalCrieria').hide();
        $('#WorkingCapital').hide();
        $('#RatioCalculation').hide();
        $('#divinterestType').show();
    }

    if ($('#interestType').val() == "cc_od") {
        $('#labelemi').hide();
        $('#labelannualinterest').show();
        $('#divMonthPeriod').hide();
        $('#divYearPeriod').show();
        $('#divMonthlyInterest').show();
        $('#divTotalPay').show();
    } else {
        $('#labelemi').show();
        $('#labelannualinterest').hide();
        $('#divMonthPeriod').show();
        $('#divYearPeriod').hide();
        $('#divMonthlyInterest').hide();
        $('#divTotalPay').hide();
    }

    $('#interestType').on('change', function() {
        if (this.value == 'cc_od') {
            $('#labelemi').hide();
            $('#labelannualinterest').show();
            $('#divMonthPeriod').hide();
            $('#divYearPeriod').show();
            $('#divMonthlyInterest').show();
            $('#divTotalPay').show();
        } else {
            $('#labelemi').show();
            $('#labelannualinterest').hide();
            $('#divMonthPeriod').show();
            $('#divYearPeriod').hide();
            $('#divMonthlyInterest').hide();
            $('#divTotalPay').hide();
        }
    });

    $('#PersonalBusiness').on('change', function() {
        StaffFieldDisp();
        if (this.value == 'personal_use') {
            $('#personalLoan').show();
        } else {
            $('#personalLoan').hide();
            $('#CaptitalCrieria').hide();
            $('#WorkingCapital').hide();
            $('#RatioCalculation').hide();
            $('#divinterestType').show();
        }
    });

    if (($('#PersonalBusiness').val() == "business_use") || ($('#PersonalBusiness').val() == "Business")) {
        $('#businessLoan').show();
        $('#applicationType').show();
        $('#CaptitalCrieria').show();
        $('#WorkingCapital').show();
        $('#RatioCalculation').show();
        $('#divinterestType').show();
        StaffFieldDisp();
    } else {
        $('#businessLoan').hide();
        $('#applicationType').hide();
        $('#CaptitalCrieria').hide();
        $('#WorkingCapital').hide();
        $('#RatioCalculation').hide();
        $('#divinterestType').hide();
    }

    $('#PersonalBusiness').on('change', function() {
        StaffFieldDisp();
        if (this.value == 'business_use') {
            $('#businessLoan').show();
            $('#applicationType').show();
            $('#CaptitalCrieria').show();
            $('#WorkingCapital').show();
            $('#RatioCalculation').show();
            $('#divinterestType').show();
        } else {
            $('#businessLoan').hide();
            $('#applicationType').hide();
            $('#CaptitalCrieria').hide();
            $('#WorkingCapital').hide();
            $('#RatioCalculation').hide();
            $('#divinterestType').hide();
        }
    });

    $('#rt').on('change', function() {
        if (this.value == 'CurrentRatio') {
            $('#CurrRat1').show();
            $('#CurrRat2').show();
            $('#AcidRat2').hide();
            $('#InveRat1').hide();
            $('#InveRat2').hide();
            $('#GrossProfit1').hide();
            $('#GrossProfit2').hide();
            $('#Debt1').hide();
            $('#Debt2').hide();
        } else if (this.value == 'AcidTestRatio') {
            $('#AcidRat2').show();
            $('#CurrRat1').show();
            $('#CurrRat2').hide();
            $('#InveRat1').hide();
            $('#InveRat2').hide();
            $('#GrossProfit1').hide();
            $('#GrossProfit2').hide();
            $('#Debt1').hide();
            $('#Debt2').hide();
        } else if (this.value == 'InventoryTORatio') {
            $('#AcidRat2').hide();
            $('#CurrRat1').hide();
            $('#CurrRat2').hide();
            $('#InveRat1').show();
            $('#InveRat2').show();
            $('#GrossProfit1').hide();
            $('#GrossProfit2').hide();
            $('#Debt1').hide();
            $('#Debt2').hide();
        } else if (this.value == 'GrossProfitRatio') {
            $('#AcidRat2').hide();
            $('#CurrRat1').hide();
            $('#CurrRat2').hide();
            $('#InveRat1').hide();
            $('#InveRat2').hide();
            $('#GrossProfit1').show();
            $('#GrossProfit2').show();
            $('#Debt1').hide();
            $('#Debt2').hide();
        } else if (this.value == 'DebtEquityRatio') {
            $('#AcidRat2').hide();
            $('#CurrRat1').hide();
            $('#CurrRat2').hide();
            $('#InveRat1').hide();
            $('#InveRat2').hide();
            $('#GrossProfit1').hide();
            $('#GrossProfit2').hide();
            $('#Debt1').show();
            $('#Debt2').show();
        }
    });

    if ($('#Status').val() == "1") {
        $('#Sanction-Letter').show();
        $('#Appraisal-btn').show();
    } else {
        $('#Sanction-Letter').show();
        $('#Appraisal-btn').show();
    }

    // if (SLPFlag == 1) {
    //   $('#AddRemarksBtn').addClass('disabled').removeAttr('data-toggle');
    //   $('#textToEnable').show();
    // } else {
    //   $('#AddRemarksBtn').removeClass('disabled').attr("data-toggle", "modal");
    //   $('#Enable-Remarks-Btn').addClass('disabled');
    //   $('#textToEnable').hide();
    // }

    $('#Status').on('change', function() {
        if (this.value == '1') {
            $('#Sanction-Letter').show();
            $('#Appraisal-btn').show();
        } else {
            $('#Sanction-Letter').show();
            $('#Appraisal-btn').show();
        }
    });

    if (loanDuplicateFlg == "true") {
        $('#LoanDupliactionFlg').text("Duplicate Loan Found.");
    } else {
        $('#LoanDupliactionFlg').text("No Duplicate Loan Found.");
    }

    // Applicant OtherLoanFlag
    if ($('#OtherLoanFlag').val() == '1') {
        $('#loanEmi').show();
        $('#emiRemarks').show();
    } else {
        $('#loanEmi').hide();
        $('#emiRemarks').hide();
    }

    $('#OtherLoanFlag').on('change', function() {
        if (this.value == '1') {
            $('#loanEmi').show();
            $('#emiRemarks').show();
        } else {
            $('#loanEmi').hide();
            $('#emiRemarks').hide();
        }
    });

    // First Co-Applicant OtherLoanFlag
    $('#CoApp1OtherLoanFlag').on('change', function() {
        if (this.value == '1') {
            $('#CoApp1loanEmi').show();
            $('#CoApp1emiRemarks').show();
        } else {
            $('#CoApp1loanEmi').hide();
            $('#CoApp1emiRemarks').hide();
        }
    });

    if ($('#CoApp1OtherLoanFlag').val() == '1') {
        $('#CoApp1loanEmi').show();
        $('#CoApp1emiRemarks').show();
    } else {
        $('#CoApp1loanEmi').hide();
        $('#CoApp1emiRemarks').hide();
    }

    // Second Co-Applicant OtherLoanFlag
    $('#CoApp2OtherLoanFlag').on('change', function() {
        if (this.value == '1') {
            $('#CoApp2loanEmi').show();
            $('#CoApp2emiRemarks').show();
        } else {
            $('#CoApp2loanEmi').hide();
            $('#CoApp2emiRemarks').hide();
        }
    });

    if ($('#CoApp2OtherLoanFlag').val() == '1') {
        $('#CoApp2loanEmi').show();
        $('#CoApp2emiRemarks').show();
    } else {
        $('#CoApp2loanEmi').hide();
        $('#CoApp2emiRemarks').hide();
    }

    // Applicant Employment Type
    if ($('#EmpType').val() == 'business(SelfEmployeed)') {
        $('#divAssets').show();
        $('#divTurnover').show();
        $('#divDepth').show();
    } else {
        $('#divAssets').hide();
        $('#divTurnover').hide();
        $('#divDepth').hide();
    }

    $('#EmpType').on('change', function() {
        if (this.value == 'business(SelfEmployeed)') {
            $('#divAssets').show();
            $('#divTurnover').show();
            $('#divDepth').show();
        } else {
            $('#divAssets').hide();
            $('#divTurnover').hide();
            $('#divDepth').hide();
        }
    });

    // First Co-Applicant Employment Type
    $('#CoApp1EmpType').on('change', function() {
        if (this.value == 'business(SelfEmployeed)') {
            $('#divCoApp1Assets').show();
            $('#divCoApp1Turnover').show();
            $('#divCoApp1Depth').show();
        } else {
            $('#divCoApp1Assets').hide();
            $('#divCoApp1Turnover').hide();
            $('#divCoApp1Depth').hide();
        }
    });

    if ($('#CoApp1EmpType').val() == 'business(SelfEmployeed)') {
        $('#divCoApp1Assets').show();
        $('#divCoApp1Turnover').show();
        $('#divCoApp1Depth').show();
    } else {
        $('#divCoApp1Assets').hide();
        $('#divCoApp1Turnover').hide();
        $('#divCoApp1Depth').hide();
    }

    // Second Co-Applicant Employment Type
    $('#CoApp2EmpType').on('change', function() {
        if (this.value == 'business(SelfEmployeed)') {
            $('#divCoApp2Assets').show();
            $('#divCoApp2Turnover').show();
            $('#divCoApp2Depth').show();
        } else {
            $('#divCoApp2Assets').hide();
            $('#divCoApp2Turnover').hide();
            $('#divCoApp2Depth').hide();
        }
    });

    if ($('#CoApp2EmpType').val() == 'business(SelfEmployeed)') {
        $('#divCoApp2Assets').show();
        $('#divCoApp2Turnover').show();
        $('#divCoApp2Depth').show();
    } else {
        $('#divCoApp2Assets').hide();
        $('#divCoApp2Turnover').hide();
        $('#divCoApp2Depth').hide();
    }

    // Applicant Relationship with Bank
    $('#RelWithBank').on('change', function() {
        if (this.value == 'No_Relationship') {
            $('#AccountNum').hide();
        } else {
            $('#AccountNum').show();
        }
    });

    if ($('#RelWithBank').val() == 'No_Relationship') {
        $('#AccountNum').hide();
    } else {
        $('#AccountNum').show();
    }

    // First Co-Applicant Relationship with Bank
    $('#CoApp1RelWithBank').on('change', function() {
        if (this.value == 'No_Relationship') {
            $('#CoApp1AccountNum').hide();
        } else {
            $('#CoApp1AccountNum').show();
        }
    });

    if ($('#CoApp1RelWithBank').val() == 'No_Relationship') {
        $('#CoApp1AccountNum').hide();
    } else {
        $('#CoApp1AccountNum').show();
    }

    // Second Co-Applicant Relationship with Bank
    $('#CoApp2RelWithBank').on('change', function() {
        if (this.value == 'No_Relationship') {
            $('#CoApp2AccountNum').hide();
        } else {
            $('#CoApp2AccountNum').show();
        }
    });

    if ($('#CoApp2RelWithBank').val() == 'No_Relationship') {
        $('#CoApp2AccountNum').hide();
    } else {
        $('#CoApp2AccountNum').show();
    }

    // Add Mortgage Information
    $('#AProType').on('change', function() {
        if (this.value == 'Vehicle') {
            $('#divOwner').hide();
            $('#propertyDetailLabel').hide();
            $('#propertyValLabel').hide();
            $('#divSeller').show();
            $('#showroomPriceLabel').show();
            $('#Propvalue').attr("placeholder", "Enter Ex-Showroom Price");
            $('#makeModelLabel').show();
            $("#PropDetails").attr("placeholder", "Enter Make and Model");
            $('#divProDetail').show();
            $('#divProVal').show();
        } else {
            $('#divOwner').show();
            $('#propertyDetailLabel').show();
            $('#propertyValLabel').show();
            $('#divProDetail').show();
            $('#divProVal').show();
            $('#divSeller').hide();
            $('#showroomPriceLabel').hide();
            $('#Propvalue').attr("placeholder", "Enter Total Property Value");
            $('#makeModelLabel').hide();
            $("#PropDetails").attr("placeholder", "Enter Property Details");
        }
    });

    // This accessFlg decides whether user has permission to edit the loan deatils information
    console.log("accessFlg", accessFlg);
    if (accessFlg == "false") {
        $("#Loan-Request :input").attr("disabled", true);
        $("#applicantbasicinfo :input").attr("disabled", true);
        $("#additionaldeatils :input").attr("disabled", true);
        $("#documents :input").attr("disabled", true);
        $("#checklist :input").attr("disabled", true);
        $("#smstocustomer :input").attr("disabled", true);
        $("#divAppraisalAssignPanel :input").attr("disabled", true);
        $("#divAppraisalReviewPanel :input").attr("disabled", true);
        $("#WhyAssign").show();
        $('#RiskBasedButton').attr("disabled", true);
        $('#divAccNo :input').attr("disabled", true);
        $('#divSancDate :input').attr("disabled", true);
    } else {
        $("#Loan-Request :input").attr("disabled", false);
        $("#applicantbasicinfo :input").attr("disabled", false);
        $("#additionaldeatils :input").attr("disabled", false);
        $("#documents :input").attr("disabled", false);
        $("#checklist :input").attr("disabled", false);
        $("#smstocustomer :input").attr("disabled", false);
        $("#divAppraisalAssignPanel :input").attr("disabled", false);
        $("#WhyAssign").hide();
        $("#divAppraisalReviewPanel :input").attr("disabled", false);
        if (LoanStatusVal == "1") {
            $('#RiskBasedButton').attr("disabled", true);
        } else {
            $('#RiskBasedButton').attr("disabled", false);
        }
        $('#divAccNo :input').attr("disabled", false);
        $('#divSancDate :input').attr("disabled", false);
    }

    // This work on checklist task is completed or not.
    // Especiaclly check "Ready For Appraisal" Task is completed or not.
    // console.log("disableAppraisal", disableAppraisal);

    // Disables all inputs (based on form id ) if loan status is sanction On 20-01-2018 By Jue
    if (disableAppraisal == "true") {
        $("#divAppraisalAssignPanel :input").attr("disabled", true);
        $("#WhyAssign").show();
        $("#divSanctionLetter :input").attr("disabled", true);
        $('#PostSanctionChecklist').hide();
        if (LoanStatusVal == "1") {
            $("#divSanctionLetter :input").attr("disabled", false)
            $("#divDisbursalRequestForm :input").attr("disabled", false)
            $('#PostSanctionChecklist').show();
            $("#Loan-Request :input").attr("disabled", true); // Loan Request inputs Disables=True
            $("#applicantbasicinfo :input").attr("disabled", true); // Loan Basic Details inputs Disables=True
            $("#additionaldeatils :input").attr("disabled", true); // Additional Info inputs Disables=True
            $("#documents :input").attr("disabled", true); // Documents inputs Disables=True
        } else if (LoanStatusVal == "0" || LoanStatusVal == "") {
            $("#divSanctionLetter :input").attr("disabled", true)
            $("#divDisbursalRequestForm :input").attr("disabled", true)
            $('#PostSanctionChecklist').hide();
            if (accessFlg == "false") {
                $("#Loan-Request :input").attr("disabled", true); // Loan Request inputs Disables=False
                $("#applicantbasicinfo :input").attr("disabled", true); // Loan Basic Details inputs Disables=False
                $("#additionaldeatils :input").attr("disabled", true); // Additional Info inputs Disables=False
                $("#documents :input").attr("disabled", true); // Documents inputs Disables=False
            } else {
                $("#Loan-Request :input").attr("disabled", false); // Loan Request inputs Disables=False
                $("#applicantbasicinfo :input").attr("disabled", false); // Loan Basic Details inputs Disables=False
                $("#additionaldeatils :input").attr("disabled", false); // Additional Info inputs Disables=False
                $("#documents :input").attr("disabled", false); // Documents inputs Disables=False
            }
        }
    } else {
        $("#divAppraisalAssignPanel :input").attr("disabled", false);
        $("#WhyAssign").hide();
        $("#divDisbursalRequestForm :input").attr("disabled", false);
        $('#PostSanctionChecklist').show();
        if (LoanStatusVal == "1") {
            $("#divSanctionLetter :input").attr("disabled", false)
            $("#divDisbursalRequestForm :input").attr("disabled", false)
            $('#PostSanctionChecklist').attr('disabled', false);
            $("#Loan-Request :input").attr("disabled", true); // Loan Request inputs Disables=True
            $("#applicantbasicinfo :input").attr("disabled", true); // Loan Basic Details inputs Disables=True
            $("#additionaldeatils :input").attr("disabled", true); // Additional Info inputs Disables=True
            $("#documents :input").attr("disabled", true); // Documents inputs Disables=True
        } else if (LoanStatusVal == "0" || LoanStatusVal == "") {
            $("#divSanctionLetter :input").attr("disabled", true)
            $("#divDisbursalRequestForm :input").attr("disabled", true)
            if (accessFlg == "false") {
                $("#Loan-Request :input").attr("disabled", true); // Loan Request inputs Disables=False
                $("#applicantbasicinfo :input").attr("disabled", true); // Loan Basic Details inputs Disables=False
                $("#additionaldeatils :input").attr("disabled", true); // Additional Info inputs Disables=False
                $("#documents :input").attr("disabled", true); // Documents inputs Disables=False
            } else {
                $("#Loan-Request :input").attr("disabled", false); // Loan Request inputs Disables=False
                $("#applicantbasicinfo :input").attr("disabled", false); // Loan Basic Details inputs Disables=False
                $("#additionaldeatils :input").attr("disabled", false); // Additional Info inputs Disables=False
                $("#documents :input").attr("disabled", false); // Documents inputs Disables=False
            }
        }
    }

    $('.assign-btn-submit').click(function() {
        $("#Add-assign-Proc").show();
        var id = $('#LoanID').val();
        var userId = $('#userIdWithRole').val();
        var loanUserName = $('#LoanUserName').val();

        $.ajax({
            method: 'POST',
            url: '/add-update-assignment?id=' + id + '&uid=' + userId + '&loanUserName=' + loanUserName,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                // console.log(result);
                if (result.s.c == 1) {
                    $("#Add-assign-Proc").hide();
                    $('#assign-error').show();
                    $('#assign-error').text(result.s.m);
                } else {
                    $("#Add-assign-Proc").hide();
                    $('#assign-error').hide();
                    window.location.href = "/loan-form-detail?id=" + id;
                }
            }
        });
    });

    $('.edit-checklist-task-btn').click(function() {
        // $("#processing").show();
        var id = $('#Eid').val();
        var remarks = $('#ERemarks').val();
        var status = $('#EStatus').val();
        var checklistId = $('#clistid').val();
        var loanId = $('#Lnid').val();

        $.ajax({
            method: 'POST',
            url: '/update-loan-checklist-task-data?id=' + id + '&remarks=' + remarks + '&status=' + status + '&cltid=' + checklistId + '&loanid=' + loanId,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                // console.log(result);
                if (result.s.c == 1) {
                    $('#TaskError').show();
                    $('#TaskError').text(result.s.m);
                } else if (result.s.c == 0) {
                    // $("#processing").hide();
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#FormLoanRequest').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormLoanRequest [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/update-loan-request',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#loan-req-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#LoanRequest-btn').click(function() {
        $("#loan-req-process").show();
        $('#FormLoanRequest').submit();
    });

    $('#FormAppBasicInfo').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormAppBasicInfo [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/update-loan-basic-info',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#App-basic-info-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#LoanAppBasicInfo-btn').click(function() {
        $("#App-basic-info-process").show();
        $('#FormAppBasicInfo').submit();
    });

    $('#FormAccountNumAdd').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormAccountNumAdd [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/update-cbs-loan-num',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#App-basic-info-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#AddCbsLoanAccNum-btn').click(function() {
        $("#App-basic-info-process").show();
        $('#FormAccountNumAdd').submit();
    });

    // add/update Sanction Date -27-02-2018
    $('#AddSancDate-btn').click(function() {
        $("#App-basic-info-process").show();
        $('#FormSancDate').submit();
    });

    $('#FormSancDate').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormSancDate [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/update-loan-sanc-date',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#App-basic-info-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });


    $('#FormLoanSms').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormLoanSms [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-loan-sms',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#loan-sms-msg-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#LoanSmsSend-btn').click(function() {
        $("#loan-sms-msg-process").show();
        $('#FormLoanSms').submit();
    });

    $('#FormAddMortgage').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormAddMortgage [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-mortgage-data',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#add-mortgage-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#AddMortgage-btn').click(function() {
        $("#add-mortgage-process").show();
        $('#FormAddMortgage').submit();
    })

    $('#FormEditMortgage').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormEditMortgage [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-mortgage-data',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#add-mortgage-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#EditMortgage-btn').click(function() {
        $("#edit-mortgage-process").show();
        $('#FormEditMortgage').submit();
    })

    $('#FormDeleteMortgage').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormDeleteMortgage [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/del-mortgage-data',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#del-mortgage-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('.deleteMortgage-btn').click(function() {
        $("#del-mortgage-process").show();
        $('#FormDeleteMortgage').submit();
    });

    //saurabh-14-07-2017 form multipart - Add Id Proof
    $('#AddIdProofDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormAddIdProofDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Edit-id-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                required = false;
            }
        });

        // $('#FormAddIdProofDoc').submit();
        // // Get form
        var form = $('#FormAddIdProofDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#AddIdProofDoc-Btn").prop("disabled", true);
        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#add-id-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditIdProofDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormEditIdProofDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Edit-id-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Edit-id-doc-pro").show();
                required = false;
            }
        });

        // // Get form
        var form = $('#FormEditIdProofDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#EditIdProofDoc-Btn").prop("disabled", true);
        // $("#AddIdProofDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Edit-id-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#delIdProof-btn').click(function() {
        $('#Del-id-doc-pro').show();
        var id = $('#delIdProof').val();
        var LoanId = $("#delloanId").val();

        $.ajax({
            method: 'POST',
            url: '/delete-proof-doc-record?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#Del-id-doc-pro').hide();
                window.location.href = "/loan-form-detail?id=" + LoanId
            }
        });
    });

    //saurabh-14-07-2017 form multipart - Address Proof
    $('#AaddressProofDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormAddrProofDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Aaddress-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Aaddress-doc-pro").show();
                required = false;
            }
        });

        // $('#FormAddIdProofDoc').submit();
        // // Get form
        var form = $('#FormAddrProofDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#AaddressProofDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Aaddress-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditAddrProofDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormEditAddrProofDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Edit-Addr-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Edit-Addr-pro").show();
                required = false;
            }
        });

        // $('#FormEditIdProofDoc').submit();
        // // Get form
        var form = $('#FormEditAddrProofDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Edit-Addr-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('.DeleteAddress').click(function() {
        $('#Del-Addr-pro').show();
        var id = $('#delAddress').val();

        $.ajax({
            method: 'POST',
            url: '/delete-proof-doc-record?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#Del-Addr-pro').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    //saurabh-15-07-2017 form multipart - Financial Proof
    $('#AddFinDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormAddFinDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Add-fin-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Add-fin-doc-pro").show();
                required = false;
            }
        });

        // $('#FormAddIdProofDoc').submit();
        // // Get form
        var form = $('#FormAddFinDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#AddFinDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Add-fin-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditFinDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormEditFinDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Edit-fin-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Edit-fin-doc-pro").show();
                required = false;
            }
        });

        // // Get form
        var form = $('#FormEditFinDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#EditFinDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Edit-fin-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#delFinDoc-btn').click(function() {
        $('#Del-fin-doc-pro').show();
        var id = $('#delFinDoc').val();

        $.ajax({
            method: 'POST',
            url: '/delete-proof-doc-record?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#Del-fin-doc-pro').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    //saurabh-15-07-2017 form multipart - Property Proof
    $('#AddProDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = false;

        // // Get form
        var form = $('#FormAddProDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#AddProDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Add-Pro-doc-proc").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditProDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = false;

        // // Get form
        var form = $('#FormEditProDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#EditProDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Edit-Pro-doc-proc").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#delProDoc-btn').click(function() {
        $('#Del-pro-doc-proc').show();
        var id = $('#delProperty').val();

        $.ajax({
            method: 'POST',
            url: '/delete-proof-doc-record?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#Del-pro-doc-proc').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    //saurabh-15-07-2017 form multipart - ID Proof (Guarantor)
    $('#AddGIdProofDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormAddGIdProofDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#add-GId-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#add-GId-doc-pro").show();
                required = false;
            }
        });

        // $('#FormAddIdProofDoc').submit();
        // // Get form
        var form = $('#FormAddGIdProofDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#AddGIdProofDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#add-GId-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditGIdProofDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormEditGIdProofDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Edit-GId-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Edit-GId-doc-pro").show();
                required = false;
            }
        });

        // $('#FormEditIdProofDoc').submit();
        // // Get form
        var form = $('#FormEditGIdProofDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#EditGIdProofDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Edit-GId-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#delGIdProof-btn').click(function() {
        $('#Del-Gid-doc-pro').show();
        var id = $('#delGIdProof').val();

        $.ajax({
            method: 'POST',
            url: '/delete-proof-doc-record?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#Del-Gid-doc-pro').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    //saurabh-17-07-2017 form multipart - Address Proof (Guarantor)
    $('#AddGAddrProofDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormAddGAddrDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#add-GAddr-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#add-GAddr-doc-pro").show();
                required = false;
            }
        });

        // $('#FormAddIdProofDoc').submit();
        // // Get form
        var form = $('#FormAddGAddrDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#AddGAddrProofDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#add-GAddr-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditGAddrProofDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormEditGAddrDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Edit-GAddr-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Edit-GAddr-doc-pro").show();
                required = false;
            }
        });

        // $('#FormEditIdProofDoc').submit();
        // // Get form
        var form = $('#FormEditGAddrDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#EditGAddrProofDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Edit-GAddr-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#delGAddrProof-btn').click(function() {
        $('#Del-GAddr-doc-pro').show();
        var id = $('#delGAddrPID').val();

        $.ajax({
            method: 'POST',
            url: '/delete-proof-doc-record?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#Del-GAddr-doc-pro').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    //saurabh-17-07-2017 form multipart - Financial Proof (Guarantor)
    $('#AddGFinDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormAddGFinDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Add-GFin-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Add-GFin-doc-pro").show();
                required = false;
            }
        });

        // $('#FormAddIdProofDoc').submit();
        // // Get form
        var form = $('#FormAddGFinDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#AddFinDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Add-GFin-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditGFinDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormEditGFinDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Edit-GFin-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Edit-GFin-doc-pro").show();
                required = false;
            }
        });

        // $('#FormEditIdProofDoc').submit();
        // // Get form
        var form = $('#FormEditGFinDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#EditGFinDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Edit-GFin-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#delGFinDoc-btn').click(function() {
        $('#Del-GFin-doc-pro').show();
        var id = $('#delGFid').val();

        $.ajax({
            method: 'POST',
            url: '/delete-proof-doc-record?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#Del-GFin-doc-pro').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    //saurabh-17-07-2017 form multipart - Property Proof (Guarantor)
    $('#AddGPropDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = false;

        // // Get form
        var form = $('#FormAddGPropDoc')[0];
        // console.log(form);

        // Create an FormData object
        var data = new FormData(form);
        // console.log(data);

        // disabled the submit button
        // $("#AddGPropDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Add-GProp-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditGPropDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = false;

        // // Get form
        var form = $('#FormEditGPropDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#EditGPropDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Edit-GProp-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#delGPropDoc-btn').click(function() {
        $('#Del-GProp-doc-pro').show();
        var id = $('#delGPropDoc').val();

        $.ajax({
            method: 'POST',
            url: '/delete-proof-doc-record?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#Del-GProp-doc-pro').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    //saurabh-17-07-2017 form multipart - Other Document Proof (Guarantor/Applicant/Co-Applicant)
    $('#AddOthersDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormAddOtherDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Add-Other-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Add-Other-doc-pro").show();
                required = false;
            }
        });

        // $('#FormAddIdProofDoc').submit();
        // // Get form
        var form = $('#FormAddOtherDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#AddOthersDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Add-Other-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditOthersDoc-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#FormEditOtherDoc [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Edit-Other-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                $("#Edit-Other-doc-pro").show();
                required = false;
            }
        });
        // $('#FormEditIdProofDoc').submit();
        // // Get form
        var form = $('#FormEditOtherDoc')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        // $("#EditOthersDoc-Btn").prop("disabled", true);

        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-update-proof-doc",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#Edit-Other-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#delOtherDoc-btn').click(function() {
        $('#Del-Other-doc-pro').show();
        var id = $('#delOtherDoc').val();

        $.ajax({
            method: 'POST',
            url: '/delete-proof-doc-record?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#Del-Other-doc-pro').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    //saurabh-17-07-2017 form - Review
    $('#FormAddReview').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormAddReview [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-los-review',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#Add-Review-Proc").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#Add-Review-Btn').click(function() {
        $("#Add-Review-Proc").show();
        $('#FormAddReview').submit();
    });

    //Jue-17-11-2017 form - Sanction Latter Remarks
    $('#Add-Remarks-Btn').click(function() {
        $("#Add-Remarks-Proc").show();
        $('#FormAddRemaks').submit();
    });

    $('#FormAddRemaks').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormAddRemaks [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-sanction-remark',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#Add-Remarks-Proc").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    // Edit Start
    $('#Edit-Remarks-Btn').click(function() {
        $("#Edit-Remarks-Proc").show();
        $('#FormEditRemarks').submit();
    });

    $('#FormEditRemarks').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormEditRemarks [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-sanction-remark',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#Edit-Remarks-Proc").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });
    // Edit end

    // Jue-17-07-2017 Additional Primary Detail Add-Update-Delete
    $('#FormAddPrimaryDetail').submit(function(event) {
        event.preventDefault();
        var required = true;

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormAddPrimaryDetail [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
                $("#add-primary-detail-process").hide();
                required = true;
            } else {
                required = false;
            }
        });

        if (required == false) {
            $.ajax({
                method: 'POST',
                url: '/add-update-primary-secondary-detail',
                data: $(this).serialize(),
                error: function(xhr, status, err) {},
                success: function(result) {
                    $("#add-primary-detail-process").hide();
                    if (result.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#AddPrimaryDetail-btn').click(function() {
        $("#add-primary-detail-process").show();
        $('#FormAddPrimaryDetail').submit();
    })

    $('#FormEditPrimaryDetail').submit(function(event) {
        event.preventDefault();
        var required = true;

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormEditPrimaryDetail [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                required = false;
            }
        });

        if (required == false) {
            $.ajax({
                method: 'POST',
                url: '/add-update-primary-secondary-detail',
                data: $(this).serialize(),
                error: function(xhr, status, err) {},
                success: function(result) {
                    $("#add-primary-detail-process").hide();
                    if (result.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditPrimaryDetail-btn').click(function() {
        $("#add-primary-detail-process").show();
        $('#FormEditPrimaryDetail').submit();
    })

    $('.deletePrimaryDetail-btn').click(function() {
        $('#add-primary-detail-process').show();
        var id = $('#delPD').val();

        $.ajax({
            method: 'POST',
            url: '/del-primary-secondary-detail?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#add-primary-detail-process').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    // Jue-17-07-2017 Additional Secondary Detail Add-Update-Delete
    $('#FormAddSecondaryDetail').submit(function(event) {
        event.preventDefault();
        var required = true;

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormAddSecondaryDetail [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
                $("#add-secondary-detail-process").hide();
                required = true;
            } else {
                required = false;
            }
        });

        if (required == false) {
            $.ajax({
                method: 'POST',
                url: '/add-update-primary-secondary-detail',
                data: $(this).serialize(),
                error: function(xhr, status, err) {},
                success: function(result) {
                    $("#add-secondary-detail-process").hide();
                    if (result.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#AddSecondaryDetail-btn').click(function() {
        $("#add-secndary-detail-process").show();
        $('#FormAddSecondaryDetail').submit();
    })

    $('#FormEditSecondaryDetail').submit(function(event) {
        event.preventDefault();
        var required = true;

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormEditSecondaryDetail [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                required = false;
            }
        });

        if (required == false) {
            $.ajax({
                method: 'POST',
                url: '/add-update-primary-secondary-detail',
                data: $(this).serialize(),
                error: function(xhr, status, err) {},
                success: function(result) {
                    $("#add-secondary-detail-process").hide();
                    if (result.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditSecondaryDetail-btn').click(function() {
        $("#add-secondary-detail-process").show();
        $('#FormEditSecondaryDetail').submit();
    })

    $('.deleteSecondaryDetail-btn').click(function() {
        $('#add-secondary-detail-process').show();
        var id = $('#delSD').val();

        $.ajax({
            method: 'POST',
            url: '/del-primary-secondary-detail?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#add-secondary-detail-process').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    // Jue-17-07-2017 Additional Gurantor Detail Add-Update-Delete
    $('#AddGaurantorDetail').submit(function(event) {
        event.preventDefault();
        var required = true;

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#AddGaurantorDetail [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                required = false;
            }
        });

        if (required == false) {
            $.ajax({
                method: 'POST',
                url: '/add-update-gaurantor-detail',
                data: $(this).serialize(),
                error: function(xhr, status, err) {},
                success: function(result) {
                    $("#gaurantor-process").hide();
                    if (result.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#AddGaurantorDetail-btn').click(function() {
        $("#gaurantor-process").show();
        $('#AddGaurantorDetail').submit();
    })

    $('#EditGaurantorDetail').submit(function(event) {
        event.preventDefault();
        var required = true;

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#EditGaurantorDetail [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                required = false;
            }
        });

        if (required == false) {
            $.ajax({
                method: 'POST',
                url: '/add-update-gaurantor-detail',
                data: $(this).serialize(),
                error: function(xhr, status, err) {},
                success: function(result) {
                    $("#gaurantor-process").hide();
                    if (result.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    $('#EditGaurantorDetail-btn').click(function() {
        $("#gaurantor-process").show();
        $('#EditGaurantorDetail').submit();
    })

    $('.deleteGaurantorDetail-btn').click(function() {
        $('#gaurantor-process').show();
        var id = $('#delG').val();

        $.ajax({
            method: 'POST',
            url: '/del-gaurantor-detail?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#gaurantor-process').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    // Jue-17-07-2017 Additional WorkingCapital Detail Add-Update-Delete
    $('#formAddWorkingCapital').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#formAddWorkingCapital [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-working-capital',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#add-working-capital-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#AddWorkingCapital-btn').click(function() {
        $("#add-working-capital-process").show();
        $('#formAddWorkingCapital').submit();
    })

    $('#formEditWorkingCapital').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#formEditWorkingCapital [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-working-capital',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#add-working-capital-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#EditWorkingCapital-btn').click(function() {
        $("#add-working-capital-process").show();
        $('#formEditWorkingCapital').submit();
    })

    $('.deleteWorkingCapital-btn').click(function() {
        $('#del-working-process').show();
        var id = $('#delWC').val();

        $.ajax({
            method: 'POST',
            url: '/del-working-capital?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#del-working-process').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    // Jue-18-07-2017 Additional Ratio Calculation Functionality
    $('#formCalRatio').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#formCalRatio [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-cal-ratio',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#cal-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#Cal-btn').click(function() {
        if ($('#rt').val() == "CurrentRatio") {
            var cr1 = parseFloat($("#cr1").val());
            var cr2 = parseFloat($("#cr2").val());
            var cal = parseFloat(cr1 / cr2);
        } else if ($('#rt').val() == "AcidTestRatio") {
            var cr1 = parseFloat($("#cr1").val());
            var ar2 = parseFloat($("#ar2").val());
            var cal = parseFloat(cr1 / ar2);
        } else if ($('#rt').val() == "InventoryTORatio") {
            var ir1 = parseFloat($("#ir1").val());
            var ir2 = parseFloat($("#ir2").val());
            var cal = parseFloat(ir1 / ir2);
        } else if ($('#rt').val() == "GrossProfitRatio") {
            var gp1 = parseFloat($("#gp1").val());
            var gp2 = parseFloat($("#gp2").val());
            var cal = parseFloat(gp1 / gp2);
        } else if ($('#rt').val() == "DebtEquityRatio") {
            var dr1 = parseFloat($("#dr1").val());
            var dr2 = parseFloat($("#dr2").val());
            var cal = parseFloat(dr1 / dr2);
        }
        var res = cal.toFixed(2);
        $('#ratio').val(res);
        $("#Cal-save-btn").show();
        $("#Cal-btn").hide();
    });

    $('#Cal-save-btn').click(function() {
        $("#cal-process").show();
        $('#formCalRatio').submit();
    });


    $('#EditAppraisalAuthInfo-btn').click(function() {
        $("#Edit-Appraisal-Auth-Info-Pro").show();
        $('#FormEditAppraisalAuthInfo').submit();
    })

    $('#FormEditAppraisalAuthInfo').submit(function(event) {
        event.preventDefault();
        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $.ajax({
            method: 'POST',
            url: '/update-apparaisal-authority-data',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                // console.log(result);
                $("#Edit-Appraisal-Auth-Info-Pro").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                } else if (result.s.c == 1) {
                    $('.divAppraisalAuthErrMsg').show();
                    $('.divAppraisalAuthErrMsg').text(result.s.m)
                }
            }
        });
    });

    $('#Generate-Sanction-Letter').click(function() {
        var loanid = loanId;
        var ractificationFlg = $('#RatiFlg').val();
        var sanctionYear = $('#SanctionYear').val();
        var flg = 1;

        $.ajax({
            method: 'POST',
            url: '/update-slprintflg?id=' + loanid + '&slpflg=' + flg + '&ratFlg=' + ractificationFlg + '&sanctionYear=' + sanctionYear,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                window.location.href = "/loan-form-detail?id=" + loanId;
            }
        });

        var url = "/generate-sanction-letter?id=" + loanId;
        window.open(url, '_blank');
    });

    $('#Enable-Remarks-Btn').click(function() {
        var loanid = loanId;
        var flg = -1;

        $.ajax({
            method: 'POST',
            url: '/update-slprintflg?id=' + loanid + '&slpflg=' + flg + '&ratFlg=' + ractificationFlg,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                window.location.href = "/loan-form-detail?id=" + loanId;
            }
        });
    });

    $('#Disbursal-Request-form').click(function() {
        var url = "/generate-disbursal-form?id=" + loanId;
        window.open(url, '_blank');
    });

    $('#taskListRpage').click(function() {
        window.location.href = "/loan-form-detail?id=" + loanId;
    });

    $('#Print-Letter').click(function() {
        window.location.href = "/appraisal-letter?id=" + loanId;
    });

    // tab retained after the page is refreshed
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
        localStorage.setItem('activeTab', $(e.target).attr('href'));
    });
    var activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        $('#myTab a[href="' + activeTab + '"]').tab('show');
    }

    // alter section code
    var loanAmt = $('#loanAmt').val();
    var monthlyemi = $('#EMI').val();
    var nmi = $('#NMI').val();
    var cnmi = $('#CoAppNetMnthlyIncome').val();
    var otherEmi = $('#TotalLoanEMI').val();
    var turnOver = $('#GrossTurnover').val();
    var totalAssets = $('#TotalAssets').val();
    var stockDepth = $('#StockBookDepth').val();

    if (monthlyemi == "") {
        monthlyemi = "0";
    }

    if (nmi == "") {
        nmi = "0";
    }

    if (cnmi == "") {
        cnmi = "0";
    }

    if (otherEmi == "") {
        otherEmi = "0"
    }

    if (turnOver == "") {
        turnOver = "0";
    }

    if (totalAssets == "") {
        totalAssets = "0";
    }

    if (stockDepth == "") {
        stockDepth = "0"
    }

    var totalIncome = (parseFloat(nmi) + parseFloat(cnmi)) - parseFloat(otherEmi);
    var cal = parseFloat(totalIncome) * (0.6);

    $('#emi').text(monthlyemi);
    $('#totalIncome').text(totalIncome);

    var eFlag = "";
    if (monthlyemi > cal) {
        eFlag = "NO";
        $('#eligible-Income').show();
        if (interestTypeForFormula == "cc_od") {
            $('#CC-OD').show();
        } else if (interestTypeForFormula == "term" || interestTypeForFormula == "") {
            $('#Term-EMI').show();
        }
    } else if (monthlyemi < cal) {
        eFlag = "YES";
        $('#eligible-Income').show();
        if (interestTypeForFormula == "cc_od") {
            $('#CC-OD').show();
        } else if (interestTypeForFormula == "term" || interestTypeForFormula == "") {
            $('#Term-EMI').show();
        }
    }

    var eSFlag = "";
    if (parseFloat(loanAmt) < (5 * parseFloat(turnOver)) && parseFloat(loanAmt) < (0.7 * (parseFloat(totalAssets) + parseFloat(stockDepth)) / 2)) {
        eSFlag = "YES";
    } else {
        eSFlag = "NO";
    }

    if (stockDepth == "0") {
        $('#diveligibleStackFlag').hide();
    } else {
        $('#diveligibleStackFlag').show();
        $('#eligible-Assets').show();
    }

    $('#eligibleFlag').text(eFlag);
    $('#eligibleStackFlag').text(eSFlag);

    // age part for additional details
    $('#APage').val(applicantAge);

    $('#Apname').on('change', function() {
        var name = $('#Apname').val();
        if (name == applicantID) {
            $('#APage').val(applicantAge);
        } else {
            $('#APage').val("");
        }
    });

    //Applicant Annual income
    $("#AnnIncome").focusout(function() {
        var annual = $('#AnnIncome').val();
        var monthly = (annual / 12).toFixed(0);

        $('#NMI').val(monthly);
    });

    //Guarantor Annual income
    $("#GAnnualincome").focusout(function() {
        var annual = $('#GAnnualincome').val();
        var monthly = (annual / 12).toFixed(0);

        $('#GMonthlyincome').val(monthly);
    });

    $("#EGAnnualIncome").focusout(function() {
        var annual = $('#EGAnnualIncome').val();
        var monthly = (annual / 12).toFixed(0);

        $('#EGMonthlyIncome').val(monthly);
    });

    // Add Existing Loan Details
    $('#formAddExistingLoan').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#formAddExistingLoan [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-existing-loan-detail',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#add-existing-loan-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#AddLoanDetail-btn').click(function() {
        $("#add-existing-loan-process").show();
        $('#formAddExistingLoan').submit();
    });

    // Edit Existing Loan Details
    $('#formEditExistingLoan').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#formEditExistingLoan [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-existing-loan-detail',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#edit-existing-loan-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#EditLoanDetail-btn').click(function() {
        $("#edit-existing-loan-process").show();
        $('#formEditExistingLoan').submit();
    })

    // Delete Existing Loan Details
    $('.deleteExistingLoanDetail-btn').click(function() {
        $('#del-existing-loan-detail-process').show();
        var id = $('#delEL').val();

        $.ajax({
            method: 'POST',
            url: '/del-existing-loan-detail?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#del-existing-loan-detail-process').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    // Add Banking Details
    $('#formAddbankingDetail').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#formAddbankingDetail [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-banking-detail',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#add-banking-detail-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#AddbankingDetail-btn').click(function() {
        $("#add-banking-detail-process").show();
        $('#formAddbankingDetail').submit();
    })

    // Edit Banking Details
    $('#formEditBankingLoan').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#formEditBankingLoan [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-banking-detail',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#edit-existing-loan-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#EditBankingDetail-btn').click(function() {
        $("#edit-existing-loan-process").show();
        $('#formEditBankingLoan').submit();
    })

    // Delete Banking Details
    $('.deleteBankingDetail-btn').click(function() {
        $('#del-Banking-detail-process').show();
        var id = $('#delBD').val();

        $.ajax({
            method: 'POST',
            url: '/del-banking-detail?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#del-Banking-detail-process').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    $('.refreshEditpage').click(function() {
        window.location.href = "/loan-form-detail?id=" + loanId
    });

    // Add Risk Based Approvals
    $('#FormAddRiskApproval').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormAddRiskApproval [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-risk-approval',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#Add-Risk-Approval-Proc").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#Add-Risk-Approval-Btn').click(function() {
        $("#Add-Risk-Approval-Proc").show();
        $('#FormAddRiskApproval').submit();
    })

    // Edit Risk Based Approvals
    $('#FormEditRiskApproval').submit(function(event) {
        event.preventDefault();

        // Field Validation for browsers not supporting html5 required attribute
        // fix for IE < 10
        $("#FormEditRiskApproval [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "border-color": "red"
                });
            }
            return;
        });

        $.ajax({
            method: 'POST',
            url: '/add-update-risk-approval',
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $("#edit-existing-loan-process").hide();
                if (result.s.c == 0) {
                    window.location.href = "/loan-form-detail?id=" + loanId;
                }
            }
        });
    });

    $('#Edit-Risk-Approval-Btn').click(function() {
        $("#edit-risk-approval-process").show();
        $('#FormEditRiskApproval').submit();
    })

    // Delete Risk Based Approvals
    $('.deleteBankingDetail-btn').click(function() {
        $('#del-risk-approval-process').show();
        var id = $('#delRA').val();

        $.ajax({
            method: 'POST',
            url: '/del-risk-approval?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                $('#del-risk-approval-process').hide();
                window.location.href = "/loan-form-detail?id=" + loanId
            }
        });
    });

    // ................... Upload Balance Sheet (Multipart Form Submit).............. //

    $('#UploadBalanceSheet-Btn').click(function(event) {
        event.preventDefault();
        var required = true;

        $("#formBalanceSheetUpload [required]").each(function(index) {
            if ($(this).val().length <= 0) {
                $("#Edit-id-doc-pro").hide();
                $(this).css({
                    "border-color": "red"
                });
                required = true;
            } else {
                required = false;
            }
        });

        // // Get form
        var form = $('#formBalanceSheetUpload')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        if (required == false) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/add-balance-sheet-data",
                data: data,
                processData: false,
                contentType: false,
                error: function(xhr, status, err) {},
                success: function(data) {
                    $("#add-id-doc-pro").hide();
                    if (data.s.c == 0) {
                        window.location.href = "/loan-form-detail?id=" + loanId;
                    }
                }
            });
        }
    });

    // ............... Delete Balance Sheet .............. //
    $('.deleteBalanceSheet').click(function() {
        var id = $('#delBalFile').val();

        $.ajax({
            method: 'POST',
            url: '/delete-balance-sheet-data?id=' + id,
            data: $(this).serialize(),
            error: function(xhr, status, err) {},
            success: function(result) {
                window.location.href = "/loan-form-detail?id=" + loanId;
            }
        });
    });

    // Show / Hide Co-Applicant details 
    if ($("#divCoAppInfo").is(':visible') == true) {
        $("#divAddNewCoAppSection").hide();
    } else {
        $("#divAddNewCoAppSection").show();
    }

    // Displaying First Co-Applicant Section
    $("#divAddNewCoAppSection").click(function() {
        $("#divNewCoAppSection").show();
        $("#divRemoveNewCoAppSection").show();
        $("#divAddAnotherCoAppSection").show();
        $("#divAddNewCoAppSection").hide();
        $("#divRemoveAnotherCoAppSection").hide();
    });

    $('#divRemoveNewCoAppSection').click(function() {
        $("#divRemoveNewCoAppSection").hide();
        $("#divNewCoAppSection").hide();
        $("#divAnotherCoAppSection").hide();
        $("#divAddNewCoAppSection").show();
        // this will clear all input data for First Co-Applicant section
        $('#divNewCoAppSection').find('input:text').val('');
        $('#divAnotherCoAppSection').find('input:text').val('');
    });

    // Displaying Second Co-Applicant Section
    $("#divAddAnotherCoAppSection").click(function() {
        $("#divAnotherCoAppSection").show();
        $("#divRemoveAnotherCoAppSection").show();
        $("#divAddAnotherCoAppSection").hide();
    });

    $('#divRemoveAnotherCoAppSection').click(function() {
        $("#divRemoveAnotherCoAppSection").hide();
        $("#divAnotherCoAppSection").hide();
        $("#divAddAnotherCoAppSection").show();
        // this will clear all input data for Second Co-Applicant section
        $('#divAnotherCoAppSection').find('input:text').val('');
    });

    // First Co-Applicant Gross Monthly Income
    $("#CoApp1AnnIncome").focusout(function() {
        var annual = $('#CoApp1AnnIncome').val();
        var monthly = (annual / 12).toFixed(0);
        $('#CoApp1NMI').val(monthly);
        if ($('#PersonalBusiness').val() != 'business_use') {}
    });

    // Second Co-Applicant Gross Monthly Income
    $("#CoApp2AnnIncome").focusout(function() {
        var annual = $('#CoApp2AnnIncome').val();
        var monthly = (annual / 12).toFixed(0);
        $('#CoApp2NMI').val(monthly);
        if ($('#PersonalBusiness').val() != 'business_use') {}
    });

    if (($('#blt option:selected').text().toLowerCase().indexOf("cash credit") != -1) ||
        ($('#blt option:selected').text().toLowerCase().indexOf("hypothecation") != -1)) {
        $("#ProprietorDetailDiv").show();
        $("#DivPacsName").hide();
        $("#SanctionYearSelDiv").show();
    } else {
        $("#ProprietorDetailDiv").hide();
        $("#SanctionYearSelDiv").hide();
    }

    if (($('#blt option:selected').text().toLowerCase().indexOf("society") != -1) ||
        ($('#blt option:selected').text().toLowerCase().indexOf("soc") != -1) ||
        ($('#blt option:selected').text().toLowerCase().indexOf("milk") != -1)) {
        $("#ProprietorDetailDiv").hide();
        $("#DivPacsName").show();
        $("#ProprietorDetailDiv").hide();
    } else {
        $("#DivPacsName").hide();
    }

    // Only for Banas Bank
    // Download Office Nondh
    $('#OfcNondhDwnld-btn').click(function() {
        var loanid = loanId;

        var url = "/generate-office-nondh?id=" + loanId;
        window.open(url, '_blank');
    });

});