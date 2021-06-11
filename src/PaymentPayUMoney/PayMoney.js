import React from 'react';

class PayMoney extends React.PureComponent{





	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	data:{
					
						amount: "10.00",
						email: "erkuldeepshinde@gmail.com",
					
			}, 
			
				orderId: "",
				token: "",
				amount: "",
		
		
	    }
		this.loadTestDBFromServer = this.loadTestDBFromServer.bind(this);
		this.launchPayment = this.launchPayment.bind(this);
		this.post = this.post.bind(this);
		this.isDate = this.isDate.bind(this);
		this.isObj = this.isObj.bind(this);
		this.stringifyValue = this.stringifyValue.bind(this);
		this.buildForm = this.buildForm.bind(this);
		this.launchJSPayMode = this.launchJSPayMode.bind(this);
	


	}


	 isDate(val) {
		// Cross realm comptatible
		return Object.prototype.toString.call(val) === '[object Date]'
	  }
	  
	   isObj(val) {
		return typeof val === 'object'
	  }
	  
	    stringifyValue(val) {
		if (this.isObj(val) && !this.isDate(val)) {
		  return JSON.stringify(val)
		} else {
		  return val
		}
	  }
	  
	   buildForm({ action, params }) {
		const form = document.createElement('form')
		form.setAttribute('method', 'post')
		form.setAttribute('action', action)
	  
		Object.keys(params).forEach(key => {
		  const input = document.createElement('input')
		  input.setAttribute('type', 'hidden')
		  input.setAttribute('name', key)
		  input.setAttribute('value', this.stringifyValue(params[key]))
		  form.appendChild(input)
		})
	  console.log("FROM", form)
		return form
	  }
	  
	    post(details) {
		const form = this.buildForm(details)
		document.body.appendChild(form)
		form.submit()
		form.remove()
	  }
	
	

	launchPayment(data)
{
console.log("LAUNCH PAYTM")
const information = {
	action:"https://securegw-stage.paytm.in/order/process",
	params:data
}
console.log("INFORMATION",information)
this.post(information)
}









 loadTestDBFromServer(){ console.log("API IS IN LEVEL !")
 const formData = { amount:10.00,email:'abc@gmail.com'
	
 };



		

					 fetch(this.props.url, { 
						method: 'post',
						headers: {
							'Accept': 'application/json, text/plain, */*',
							'Content-Type': 'application/json'
							
						},
					
						body: JSON.stringify(formData)
					})
					.then(res => res.json())
					.then(data => {
						
						console.log("PAYTM DATA",data)
				
						this.launchPayment(data);
						
					})
	
}


launchJSPayMode(data)
{
console.log("LAUNCH PAYTM")
const information = {
	action:"https://securegw-stage.paytm.in/order/process",
	params:data
}
console.log("INFORMATION",information)
this.post(information)
}





payusingJSPaytm(){ console.log("API IS IN LEVEL !")
const edata = { amount:100.00,email:'erkuldeepshinde@gmail.com'};

					fetch("http://localhost:3001/api/PayMoney/Paym/JsCheckout", { 
					   method: 'post',
					   headers: {
						   'Accept': 'application/json, text/plain, */*',
						   'Content-Type': 'application/json'
						   
					   },
				   
					   body: JSON.stringify(edata)
				   })
				   .then(res => res.json())
				   .then(data => {
					   var dataobjct = JSON.parse(data.txid)
					   var makeReq = {
						orderId: data.paytmParams.body.orderId, /* update order id */
						token: dataobjct.body.txnToken,
						amount: data.paytmParams.body.txnAmount.value /* update amount */

					   }
					   this.setState({ 
						   orderId:makeReq.orderId,
						   token:makeReq.token,
						   amount:makeReq.amount
						})
					   console.log("PAYTM DATA",data.paytmParams.body.txnAmount.value)
					   console.log("PAYTM DATA",  dataobjct.body.txnToken)
					   console.log("state",  this.state.amount)
					  // this.launchJSPayMode(makeReq)
					  window.Paytm.CheckoutJS.init({
						"data": {
						  "orderId": makeReq.orderId, /* update order id */
						  "token": makeReq.token,   /* update token value */
						  "tokenType": "TXN_TOKEN",
						  "amount": makeReq.amount   /* update amount */
						},
						handler: {
						  notifyMerchant: function (eventName, data) {
							console.log("notifyMerchant handler function called");
							console.log("eventName => ", eventName);
							console.log("data => ", data);
						  }
						}
					  });
					  window.Paytm.CheckoutJS.invoke();
					   
					   
				   })
   
}



						
	render(){ console.log("Yes this is called succesfully")
		return 	<div style={{height:"1000px"}}>  
					
					<button  style={{marginRight:"5px"}} type="button" class="btn btn-outline-secondary" onClick={() => this.loadTestDBFromServer()}>Pay</button>
					<button  style={{marginRight:"5px"}} type="button" class="btn btn-outline-secondary" onClick={() => this.payusingJSPaytm()}>payusingJSPaytm</button>

					
	
			
			    </div>
	}

}

export default PayMoney;