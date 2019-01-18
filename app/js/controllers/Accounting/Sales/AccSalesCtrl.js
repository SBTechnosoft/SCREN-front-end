App.controller('AccSalesController',AccSalesController);function AccSalesController($rootScope,$scope,apiCall,apiPath,$modal,getSetFactory,toaster,apiResponse,validationMessage,productArrayFactory,maxImageSize,productFactory,$filter){'use strict';var vm=this;$scope.accSales=[];$scope.erpPath=$rootScope.erpPath;var dateFormats=$rootScope.dateFormats;var formdata=new FormData();$scope.totalTable;$scope.grandTotalTable;$scope.accSales.demotax;$scope.accSales.tax=0;$scope.disableCompany=!1;var Modalopened=!1;$scope.noOfDecimalPoints;$scope.displayOpeningBal=0.00;$scope.displayCurrentBal=0.00;$scope.displayWholeSaleOpeningBal=0.00;$scope.displayWholeSaleCurrentBal=0.00;$scope.totalDebit;$scope.totalCredit;$scope.productArrayFactory=productArrayFactory;$scope.accSales.jfid;vm.AccClientMultiTable=[];vm.multiCurrentBalance=[];$scope.changeJrnlArray=!1;vm.AccSalesTable=[];vm.productTax=[];$scope.changeProductArray=!1;$scope.errorMessage=validationMessage;vm.clientNameDropDr=[];var headerDr={'Content-Type':undefined,'ledgerGroup':[9,12,32,16]};vm.clientNameDropCr=[];var headerCr={'Content-Type':undefined,'ledgerGroup':[28,17,20]};vm.companyDrop=[];apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){vm.companyDrop=responseCompanyDrop});$scope.currentAndOpeningBal=function(companyID,Name,secondName){var headerSearch={'Content-Type':undefined,'ledgerName':Name};apiCall.getCallHeader(apiPath.getLedgerJrnl+companyID,headerSearch).then(function(response){$scope.displayOpeningBal=response.openingBalance;$scope.displayOpeningBalType=response.openingBalanceType;$scope.displayCurrentBal=response.currentBalance;$scope.displayCurrentBalType=response.currentBalanceType});var headerSearch={'Content-Type':undefined,'ledgerName':secondName};apiCall.getCallHeader(apiPath.getLedgerJrnl+companyID,headerSearch).then(function(response){$scope.displayWholeSaleOpeningBal=response.openingBalance;$scope.displayWholeSaleOpeningBalType=response.openingBalanceType;$scope.displayWholeSaleCurrentBal=response.currentBalance;$scope.displayWholeSaleCurrentBalType=response.currentBalanceType})}
$scope.defaultCompany=function(){vm.loadData=!0;apiCall.getDefaultCompany().then(function(response){$scope.accSales.companyDropDown=response;if(formdata.has('companyId')){formdata.delete('companyId')}
formdata.append('companyId',response.companyId);$scope.currentAndOpeningBal(response.companyId,'retail_sales','whole_sales');$scope.noOfDecimalPoints=parseInt(response.noOfDecimalPoints);toaster.clear();toaster.pop('wait','Please Wait','Data Loading....',60000);vm.clientNameDropDr=[];vm.clientNameDropCr=[];var jsuggestPath=apiPath.getLedgerJrnl+response.companyId;apiCall.getCallHeader(jsuggestPath,headerDr).then(function(response3){if(response3!=apiResponse.notFound){for(var t=0;t<response3.length;t++){for(var k=0;k<response3[t].length;k++){vm.clientNameDropDr.push(response3[t][k])}}}});apiCall.getCallHeader(jsuggestPath,headerCr).then(function(response3){if(response3!=apiResponse.notFound){for(var t=0;t<response3.length;t++){for(var k=0;k<response3[t].length;k++){vm.clientNameDropCr.push(response3[t][k])}}}});vm.productNameDrop=[];productFactory.getProductByCompany(response.companyId).then(function(data){vm.productNameDrop=data;toaster.clear();vm.loadData=!1})})}
this.minStart=new Date();this.maxStart=new Date();this.today=function(){this.dt1=new Date()};this.today();this.clear=function(){this.dt1=null};this.disabled=function(date,mode){return!1};this.toggleMin=function(){this.minDate=this.minDate?null:new Date()};this.toggleMin();this.open=function($event){$event.preventDefault();$event.stopPropagation();this.opened=!0};this.openStart=function($event){$event.preventDefault();$event.stopPropagation();this.openedStart=!0};this.dateOptions={formatYear:'yy',startingDay:1};this.initDate=new Date('2016-15-20');this.format=dateFormats;if(getSetFactory.get()>0){$scope.accSales.getSetJrnlId=getSetFactory.get();getSetFactory.blank();var getOneJrnlPath=apiPath.getJrnlByCompany+$rootScope.accView.companyId;var headerDataEdit={'Content-Type':undefined,'type':'sales','jfId':parseInt($scope.accSales.getSetJrnlId)};apiCall.getCallHeader(getOneJrnlPath,headerDataEdit).then(function(data){$scope.currentAndOpeningBal(data.journal[0].company.companyId,'retail_sales','whole_sales');$scope.accSales.jfid=data.journal[0].jfId;$scope.accSales.invoiceNo=data.productTransaction[0].invoiceNumber;$scope.noOfDecimalPoints=parseInt(data.productTransaction[0].company.noOfDecimalPoints);$scope.accSales.documentData=data.document;$scope.accSales.companyDropDown=data.journal[0].company;$scope.disableCompany=!0;var jsuggestPathEdit=apiPath.getLedgerJrnl+data.journal[0].company.companyId;apiCall.getCallHeader(jsuggestPathEdit,headerDr).then(function(response3){for(var t=0;t<response3.length;t++){for(var k=0;k<response3[t].length;k++){vm.clientNameDropDr.push(response3[t][k])}}});apiCall.getCallHeader(jsuggestPathEdit,headerCr).then(function(response3){for(var t=0;t<response3.length;t++){for(var k=0;k<response3[t].length;k++){vm.clientNameDropCr.push(response3[t][k])}}});vm.productNameDrop=[];productFactory.getProductByCompany(data.journal[0].company.companyId).then(function(data){vm.productNameDrop=data});var getResdate=data.journal[0].entryDate;var splitedate=getResdate.split("-").reverse().join("-");vm.dt1=new Date(splitedate);vm.minStart=new Date(splitedate);vm.maxStart=new Date(splitedate);for(var i=0;i<data.journal.length;i++){var tempData={};tempData.amountType=data.journal[i].amountType;tempData.ledgerId=data.journal[i].ledger.ledgerId;tempData.ledgerName=data.journal[i].ledger.ledgerName;tempData.amount=parseFloat(data.journal[i].amount);vm.AccClientMultiTable.push(tempData);var tempBalanceData={};tempBalanceData.currentBalance=data.journal[i].ledger.currentBalance;tempBalanceData.amountType=data.journal[i].ledger.currentBalanceType;vm.multiCurrentBalance.push(tempBalanceData)}
for(var j=0;j<data.productTransaction.length;j++){var tempProData={};tempProData.productId=data.productTransaction[j].product.productId;tempProData.productName=data.productTransaction[j].product.productName;tempProData.discountType=data.productTransaction[j].discountType;tempProData.price=parseFloat(data.productTransaction[j].price);tempProData.discount=parseFloat(data.productTransaction[j].discount);tempProData.qty=parseInt(data.productTransaction[j].qty);tempProData.color=data.productTransaction[j].product.color;tempProData.size=data.productTransaction[j].product.size;vm.AccSalesTable.push(tempProData);var varTax={};varTax.tax=parseFloat(data.productTransaction[j].product.vat);varTax.additionalTax=parseFloat(data.productTransaction[j].product.additionalTax);vm.productTax.push(varTax);$scope.calculateTaxReverse(vm.AccSalesTable[j],vm.productTax[j].tax,vm.productTax[j].additionalTax)}})}
else{$scope.defaultCompany();vm.AccClientMultiTable=[{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];vm.AccSalesTable=[{"productId":"","productName":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","color":"","size":""}];vm.productTax=[{"tax":0,"additionalTax":0}];vm.multiCurrentBalance=[{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}]}
$scope.addClientRow=function(index){var plusOne=index+1;var data={};data.amountType='debit';data.ledgerId='';data.ledgerName='';data.amount='';vm.AccClientMultiTable.splice(plusOne,0,data);var balance={};balance.currentBalance='';balance.amountType='';vm.multiCurrentBalance.splice(plusOne,0,balance);$scope.changeJrnlArray=!0};$scope.setMultiTable=function(item,index)
{vm.multiCurrentBalance[index].currentBalance=item.currentBalance;vm.multiCurrentBalance[index].amountType=item.currentBalanceType;vm.AccClientMultiTable[index].ledgerId=item.ledgerId;$scope.changeJrnlArray=!0}
$scope.removeClientRow=function(idx){$scope.changeJrnlArray=!0;vm.AccClientMultiTable.splice(idx,1);vm.multiCurrentBalance.splice(idx,1)};$scope.addRow=function(index){var plusOne=index+1;var data={};data.productId='';data.productName='';data.discountType='flat';data.discount='';data.price=0;data.qty=1;data.amount='';data.color='';data.size='';vm.AccSalesTable.splice(plusOne,0,data);var varTax={};varTax.tax=0;varTax.additionalTax=0;vm.productTax.splice(plusOne,0,varTax);$scope.changeProductArray=!0};$scope.removeRow=function(idx){vm.AccSalesTable.splice(idx,1);vm.productTax.splice(idx,1);vm.productHsn.splice(idx,1);$scope.changeProductArray=!0};vm.productHsn=[];$scope.settabledata=function(item,index)
{vm.AccSalesTable[index].productId=item.productId;vm.productHsn[index]=item.hsn;var grandPrice;grandPrice=productArrayFactory.calculate(item.purchasePrice,0,item.margin)+parseFloat(item.marginFlat);if(grandPrice==0){grandPrice=productArrayFactory.calculate(item.mrp,0,item.margin)+parseFloat(item.marginFlat)}
vm.AccSalesTable[index].price=grandPrice;vm.productTax[index].tax=parseFloat(item.vat);vm.productTax[index].additionalTax=parseFloat(item.additionalTax);vm.AccSalesTable[index].color=item.color;vm.AccSalesTable[index].size=item.size;$scope.changeProductArray=!0}
$scope.getTotal=function(){var total=0;for(var i=0;i<vm.AccSalesTable.length;i++){var product=vm.AccSalesTable[i];total+=parseFloat(product.amount)}
return total}
$scope.getTotalTax=function(){var total=0;for(var i=0;i<vm.AccSalesTable.length;i++){var product=vm.AccSalesTable[i];var vartax=vm.productTax[i];var totaltax=parseFloat(vartax.tax)+parseFloat(vartax.additionalTax);if(product.discountType=='flat'){var getAmount=$filter('setDecimal')((product.price*product.qty)-product.discount,$scope.noOfDecimalPoints)}
else{var getAmount=$filter('setDecimal')((product.price*product.qty)-((product.price*product.qty)*product.discount/100),$scope.noOfDecimalPoints)}
total+=productArrayFactory.calculateTax(getAmount,totaltax,0)}
return total}
$scope.calculateTaxReverse=function(item,cgst,sgst){var getCgst=cgst;var getSgst=sgst;if(item.discountType=='flat'){var amount=$filter('setDecimal')((item.price*item.qty)-item.discount,$scope.noOfDecimalPoints);var cgstAmount=$filter('setDecimal')(productArrayFactory.calculateTax(amount,getCgst,0),$scope.noOfDecimalPoints);var sgstAmount=$filter('setDecimal')(productArrayFactory.calculateTax(amount,getSgst,0),$scope.noOfDecimalPoints);item.amount=amount+cgstAmount+sgstAmount}
else{var amount=$filter('setDecimal')((item.price*item.qty)-((item.price*item.qty)*item.discount/100),$scope.noOfDecimalPoints);var cgstAmount=$filter('setDecimal')(productArrayFactory.calculateTax(amount,getCgst,0),$scope.noOfDecimalPoints);var sgstAmount=$filter('setDecimal')(productArrayFactory.calculateTax(amount,getSgst,0),$scope.noOfDecimalPoints);item.amount=amount+cgstAmount+sgstAmount}}
$scope.calculateTaxReverseTwo=function(item,cgst,sgst,index){var getCgst=parseFloat(cgst);var getSgst=parseFloat(sgst);var TaxSum=getCgst+getSgst;vm.AccSalesTable[index].price=$filter('setDecimal')(item.amount/(1+(TaxSum/100)),$scope.noOfDecimalPoints);var Price=item.amount/(1+(TaxSum/100))}
$scope.changeCompany=function(Fname,value){vm.loadData=!0;$scope.noOfDecimalPoints=parseInt(value.noOfDecimalPoints);$scope.currentAndOpeningBal(value.companyId,'retail_sales','whole_sales');toaster.clear();toaster.pop('wait','Please Wait','Data Loading....',60000);vm.clientNameDropDr=[];vm.clientNameDropCr=[];var jsuggestPath=apiPath.getLedgerJrnl+value.companyId;apiCall.getCallHeader(jsuggestPath,headerDr).then(function(response3){for(var t=0;t<response3.length;t++){for(var k=0;k<response3[t].length;k++){vm.clientNameDropDr.push(response3[t][k])}}});apiCall.getCallHeader(jsuggestPath,headerCr).then(function(response3){for(var t=0;t<response3.length;t++){for(var k=0;k<response3[t].length;k++){vm.clientNameDropCr.push(response3[t][k])}}});vm.productNameDrop=[];productFactory.getProductByCompany(value.companyId).then(function(data){vm.productNameDrop=data;toaster.clear();vm.loadData=!1});if(formdata.has(Fname))
{formdata.delete(Fname)}
formdata.append(Fname,value.companyId);$rootScope.accView.companyId=value.companyId;vm.AccClientMultiTable=[{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];vm.AccSalesTable=[{"productId":"","productName":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","color":"","size":""}];vm.productTax=[{"tax":0,"additionalTax":0}];vm.multiCurrentBalance=[{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}]}
$scope.uploadFile=function(files){var flag=0;for(var m=0;m<files.length;m++){if(parseInt(files[m].size)>maxImageSize){flag=1;toaster.clear();toaster.pop('alert','Opps!!','Image Size is Too Long');formdata.delete('file[]');angular.element("input[type='file']").val(null);break}}
if(flag==0){formdata.delete('file[]');angular.forEach(files,function(value,key){formdata.append('file[]',value)})}};$scope.changeAccSales=function(Fname,value){if(formdata.has(Fname))
{formdata.delete(Fname)}
formdata.append(Fname,value)}
$scope.changeSalesDate=function(Fname){if(formdata.has(Fname))
{formdata.delete(Fname)}
var date=new Date(vm.dt1);var fdate=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();formdata.append(Fname,fdate)}
$scope.changeAmountType=function(index){vm.AccClientMultiTable[index].ledgerId='';vm.AccClientMultiTable[index].ledgerName='';vm.multiCurrentBalance[index].currentBalance='';vm.multiCurrentBalance[index].amountType='';$scope.changeJrnlArray=!0}
$scope.changeJrnlTable=function(){$scope.changeJrnlArray=!0}
$scope.changeProductTable=function(){$scope.changeProductArray=!0}
$scope.deleteArray=function(){if($scope.changeJrnlArray){var jsonJrnlDelete=angular.copy(vm.AccClientMultiTable);for(var i=0;i<jsonJrnlDelete.length;i++){angular.forEach(jsonJrnlDelete[i],function(value,key){formdata.delete('data['+i+']['+key+']',value)})}}
if($scope.changeProductArray){var jsonProductDelete=angular.copy(vm.AccSalesTable);for(var i=0;i<jsonProductDelete.length;i++){angular.forEach(jsonProductDelete[i],function(value,key){formdata.delete('inventory['+i+']['+key+']',value)})}}}
$scope.disableButton=!1;$scope.pop=function()
{$scope.disableButton=!0;if($scope.totalDebit!=$scope.totalCredit){toaster.pop('alert','Opps!!','Credit/Debit Amount is Not Equal');$scope.disableButton=!1;return!1}
if($scope.accSales.getSetJrnlId){toaster.clear();toaster.pop('wait','Please Wait','Data Updating....');var accSalesPath=apiPath.postJrnl+'/'+$scope.accSales.jfid;if($scope.changeJrnlArray){var json=angular.copy(vm.AccClientMultiTable);for(var i=0;i<json.length;i++){angular.forEach(json[i],function(value,key){formdata.append('data['+i+']['+key+']',value)})}}
if($scope.changeProductArray){var jsonProduct=angular.copy(vm.AccSalesTable);for(var i=0;i<jsonProduct.length;i++){angular.forEach(jsonProduct[i],function(value,key){formdata.append('inventory['+i+']['+key+']',value)})}
if(formdata.has('tax')){formdata.delete('tax')}
formdata.append('tax',$scope.accSales.tax)}
if(formdata.has('entryDate')){var date=new Date(vm.dt1);var fdate=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();if(formdata.has('transactionDate')){formdata.delete('transactionDate')}
formdata.append('transactionDate',fdate)}
if(formdata.get('tax')==''||formdata.get('tax')==0){formdata.delete('tax')}}
else{toaster.clear();toaster.pop('wait','Please Wait','Data Inserting....',60000);var accSalesPath=apiPath.postJrnl;var json=angular.copy(vm.AccClientMultiTable);for(var i=0;i<json.length;i++){angular.forEach(json[i],function(value,key){formdata.append('data['+i+']['+key+']',value)})}
var json2=angular.copy(vm.AccSalesTable);for(var i=0;i<json2.length;i++){angular.forEach(json2[i],function(value,key){formdata.append('inventory['+i+']['+key+']',value)})}
var date=new Date(vm.dt1);var fdate=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();if(!formdata.has('entryDate')){formdata.append('entryDate',fdate)}
if(formdata.has('transactionDate')){formdata.delete('transactionDate')}
formdata.append('transactionDate',fdate);if(!formdata.has('tax')){formdata.append('billNumber','')}
formdata.append('tax',$scope.accSales.tax);if(!formdata.has('tax')||formdata.get('tax')=='undefined'){formdata.delete('tax');formdata.append('tax','')}
$scope.changeJrnlArray=!0;$scope.changeProductArray=!0}
var headerData={'Content-Type':undefined,'type':'sales'};apiCall.getCall(apiPath.getJrnlNext).then(function(response){if(!$scope.accSales.getSetJrnlId){$scope.accSales.jfid=response.nextValue;if(formdata.has('jfId')){formdata.delete('jfId')}
formdata.append('jfId',$scope.accSales.jfid)}
apiCall.postCallHeader(accSalesPath,headerData,formdata).then(function(data){toaster.clear();if($scope.accSales.getSetJrnlId){if(apiResponse.ok==data){toaster.pop('success','Title','Update Successfully');$scope.disableCompany=!1}
else{$scope.deleteArray();toaster.pop('warning','Opps!!',data)}}
else{if(apiResponse.ok==data){toaster.pop('success','Title','Insert Successfully')}
else{formdata.delete('tax');formdata.delete('jfId');$scope.deleteArray();toaster.pop('warning','Opps!!',data)}}
if(apiResponse.ok==data){if($scope.changeJrnlArray){var jsonJrnlDelete=angular.copy(vm.AccClientMultiTable);for(var i=0;i<jsonJrnlDelete.length;i++){angular.forEach(jsonJrnlDelete[i],function(value,key){formdata.delete('data['+i+']['+key+']',value)})}
$scope.changeJrnlArray=!1}
if($scope.changeProductArray){var jsonProductDelete=angular.copy(vm.AccSalesTable);for(var i=0;i<jsonProductDelete.length;i++){angular.forEach(jsonProductDelete[i],function(value,key){formdata.delete('inventory['+i+']['+key+']',value)})}
$scope.changeProductArray=!1}
for(var key of formdata.keys()){formdata.delete(key)}
formdata.delete('tax');vm.dt1=new Date();vm.minStart=new Date();vm.maxStart=new Date();angular.element("input[type='file']").val(null);formdata.delete('file[]');$scope.accSales=[];vm.clientNameDropDr=[];vm.clientNameDropCr=[];vm.AccClientMultiTable=[{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];vm.productTax=[{"tax":0,"additionalTax":0}];vm.multiCurrentBalance=[{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}];vm.AccSalesTable=[{"productId":"","productName":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","color":"","size":""}];apiCall.getCall(apiPath.getJrnlNext).then(function(response){$scope.accSales.jfid=response.nextValue});$scope.defaultCompany()}
$scope.disableButton=!1})})}
$scope.cancel=function(){toaster.clear();vm.dt1=new Date();vm.minStart=new Date();vm.maxStart=new Date();$scope.disableCompany=!1;$scope.disableButton=!1;if($scope.changeJrnlArray){var jsonJrnlDelete=angular.copy(vm.AccClientMultiTable);for(var i=0;i<jsonJrnlDelete.length;i++){angular.forEach(jsonJrnlDelete[i],function(value,key){formdata.delete('data['+i+']['+key+']',value)})}
$scope.changeJrnlArray=!1}
if($scope.changeProductArray){var jsonProductDelete=angular.copy(vm.AccSalesTable);for(var i=0;i<jsonProductDelete.length;i++){angular.forEach(jsonProductDelete[i],function(value,key){formdata.delete('inventory['+i+']['+key+']',value)})}
$scope.changeProductArray=!1}
for(var key of formdata.keys()){formdata.delete(key)}
$scope.accSales=[];vm.clientNameDropDr=[];vm.clientNameDropCr=[];angular.element("input[type='file']").val(null);formdata.delete('file[]');vm.AccClientMultiTable=[{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];vm.productTax=[{"tax":0,"additionalTax":0}];vm.multiCurrentBalance=[{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}];vm.AccSalesTable=[{"productId":"","productName":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","color":"","size":""}];apiCall.getCall(apiPath.getJrnlNext).then(function(response){$scope.accSales.jfid=response.nextValue});$scope.defaultCompany()}
$scope.AddSales=function()
{alert('Add')}
this.mytime=new Date();this.hstep=1;this.mstep=15;this.options={hstep:[1,2,3],mstep:[1,5,10,15,25,30]};this.ismeridian=!0;this.toggleMode=function(){this.ismeridian=!this.ismeridian};this.update=function(){var d=new Date();d.setHours(14);d.setMinutes(0);this.mytime=d};this.changed=function(){console.log('Time changed to: '+this.mytime)};this.clear=function(){this.mytime=null};this.testoption={"mask":"99-9999999","oncomplete":function(){console.log();console.log(arguments,"oncomplete!this log form controler")},"onKeyValidation":function(){console.log("onKeyValidation event happend! this log form controler")}};this.test1=new Date();this.dateFormatOption={parser:function(viewValue){return viewValue?new Date(viewValue):undefined},formatter:function(modelValue){if(!modelValue){return ""}
var date=new Date(modelValue);return(date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()).replace(/\b(\d)\b/g,"0$1")},isEmpty:function(modelValue){return!modelValue}};this.mask={regex:["999.999","aa-aa-aa"]};this.regexOption={regex:"[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}"};this.functionOption={mask:function(){return["[1-]AAA-999","[1-]999-AAA"]}};this.editorFontFamilyList=['Serif','Sans','Arial','Arial Black','Courier','Courier New','Comic Sans MS','Helvetica','Impact','Lucida Grande','Lucida Sans','Tahoma','Times','Times New Roman','Verdana'];this.editorFontSizeList=[{value:1,name:'Small'},{value:3,name:'Normal'},{value:5,name:'Huge'}];$scope.openLedger=function(size,index){if(Modalopened)return;if($scope.accSales.companyDropDown){var modalInstance=$modal.open({templateUrl:'app/views/PopupModal/Accounting/ledgerModal.html',controller:AccLedgerModalController,size:size,resolve:{ledgerIndex:function(){return index},companyId:function(){return $scope.accSales.companyDropDown}}});Modalopened=!0;var state=$('#modal-state');modalInstance.result.then(function(data){if($scope.accSales.companyDropDown){var jsuggestPath=apiPath.getLedgerJrnl+$scope.accSales.companyDropDown.companyId;vm.clientNameDropDr=[];apiCall.getCallHeader(jsuggestPath,headerDr).then(function(response3){for(var t=0;t<response3.length;t++){for(var k=0;k<response3[t].length;k++){vm.clientNameDropDr.push(response3[t][k])}}});vm.clientNameDropCr=[];apiCall.getCallHeader(jsuggestPath,headerCr).then(function(response3){for(var t2=0;t2<response3.length;t2++){for(var k2=0;k2<response3[t2].length;k2++){vm.clientNameDropCr.push(response3[t2][k2])}}});var headerSearch={'Content-Type':undefined,'ledgerName':data.ledgerName};apiCall.getCallHeader(apiPath.getLedgerJrnl+data.companyId,headerSearch).then(function(response){vm.AccClientMultiTable[data.index].ledgerName=response.ledgerName;vm.AccClientMultiTable[data.index].ledgerId=response.ledgerId;vm.multiCurrentBalance[data.index].currentBalance=response.currentBalance;vm.multiCurrentBalance[data.index].amountType=response.currentBalanceType})}
Modalopened=!1},function(data){Modalopened=!1})}
else{alert('Please Select Company')}};$scope.openProduct=function(size,index){if(Modalopened)return;if($scope.accSales.companyDropDown){var modalInstance=$modal.open({templateUrl:'app/views/PopupModal/Accounting/productModal.html',controller:AccProductModalController,size:size,modalClass:'rotateInDownLeft',resolve:{productIndex:function(){return index},companyId:function(){return $scope.accSales.companyDropDown}}});Modalopened=!0;modalInstance.result.then(function(data){var UrlPath=apiPath.getProductByCompany+data.companyId;toaster.clear();toaster.pop('wait','Please Wait','Data Loading....',600000);productFactory.blankProduct();productFactory.getProductByCompany(data.companyId).then(function(response){vm.productNameDrop=response;toaster.clear()});var headerSearch={'Content-Type':undefined,'productName':data.productName,'color':data.color,'size':data.size};apiCall.getCallHeader(UrlPath,headerSearch).then(function(response){vm.AccSalesTable[data.index].productName=response[0].productName;$scope.settabledata(response[0],data.index)});Modalopened=!1},function(){console.log('Cancel');Modalopened=!1})}
else{alert('Please Select Company')}};$scope.openHistoryModal=function(size){if(Modalopened)return;if($scope.accSales.companyDropDown){toaster.clear();toaster.pop('wait','Please Wait','Modal Data Loading....',60000);var modalInstance=$modal.open({templateUrl:'/myHistorySalesModalContent.html',controller:historySalesModaleCtrl,size:size,resolve:{companyId:function(){return $scope.accSales.companyDropDown}}});Modalopened=!0;modalInstance.result.then(function(){toaster.clear();Modalopened=!1},function(){console.log('Cancel');toaster.clear();Modalopened=!1})}
else{alert('Please Select Company')}}}
AccSalesController.$inject=["$rootScope","$scope","apiCall","apiPath","$modal","getSetFactory","toaster","apiResponse","validationMessage","productArrayFactory","maxImageSize","productFactory","$filter"]