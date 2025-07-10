import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
    IExecuteFunctions,
    NodeConnectionType,
	IRequestOptions,
} from 'n8n-workflow';
import { smsFields, SMSOperations } from './descriptions/SmsDescription';


export class SmsAdvert implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
        displayName: 'SMSAdvert',
        name: 'smsAdvert',
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
        icon: 'file:smsadvert.svg',
        group: ['transform'],
        version: 1,
        description: 'SMS Advert API',
        defaults: {
            name: 'SMSAdvert',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main], 
credentials: [
	{
		name: 'SMSAdvertApi',
		required: true,
	},
    
],
		properties: [
            {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	options: [
		{
			name: 'Sms',
			value: 'sms',
		},
	],
	default: 'sms',
	noDataExpression: true,
	required: true,
	description: 'Trimitere SMS prin dispozitive proprii',
},

...SMSOperations,
...smsFields

		],
	};
	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	   // Handle data coming from previous nodes
		const items = this.getInputData();
		let responseData;
    const returnData: INodeExecutionData[] = [];
    const qs: IDataObject = {};
    const baseUrl = 'https://www.smsadvert.ro/api';
		// const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
// -------------------------------------------------------------------------------


		for (let i = 0; i < items.length; i++) {
			if (resource === 'sms') {
				if (operation === 'textToPhoneNumber') {
				const phone = this.getNodeParameter('mobileNumber', i) as string;
		const shortTextMessage = this.getNodeParameter('message', i) as string;
		const senderType = this.getNodeParameter('senderType', i) as string;
		const confirmStatusWebhook = this.getNodeParameter('confirmStatusWebhook', i, '') as string;

		const sendAsShort = senderType === 'smsAdvert' ? 'true' : 'false';
			const data: IDataObject = {
			phone,
			shortTextMessage,
			sendAsShort,
		};

		// Add webhook if provided
		if (confirmStatusWebhook) {
			data['statusWebhook'] = confirmStatusWebhook;
		}

					// Get additional fields input
					// const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					
					let endpoint = `${baseUrl}/sms`;
                    //here i need all details, for this app i guess message + tel number generally
					// Object.assign(data, additionalFields);

					// Make HTTP request according to https://sendgrid.com/docs/api-reference/
					const options = {
						method: 'POST',
						body: data,
						qs: qs,
						uri: endpoint,
						json: true,
						} satisfies IRequestOptions;
						console.log('options', options);

					responseData = await this.helpers.requestWithAuthentication.call(
						this,
						'SMSAdvertApi',
						options,
					);
										returnData.push(responseData);
									}
								}


			if (resource === 'sms') {
				if (operation === 'getDevice') {
					const options: IRequestOptions = {
						method: 'GET',
						uri: `${baseUrl}/Devices/list/all/`,
						json: true,
					};

					responseData = await this.helpers.requestWithAuthentication.call(
						this,
						'SMSAdvertApi',
						options,
					);

					returnData.push({ json: responseData });
				}
			}

			if (resource === 'sms') {
				if (operation === 'getAccountDetails') {
					const options: IRequestOptions = {
						method: 'GET',
						uri: `${baseUrl}/user/account`,
						json: true,
					};

					responseData = await this.helpers.requestWithAuthentication.call(
						this,
						'SMSAdvertApi',
						options,
					);

					returnData.push({ json: responseData });
				}
			}
			if(resource === "sms"){
				if (operation === 'getApiQueue') {
	const options: IRequestOptions = {
		method: 'GET',
		uri: `${baseUrl}/messagequeue/count/api`,
		json: true,
	};

	responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'SMSAdvertApi',
		options,
	);

	returnData.push({ json: responseData });
}

			}
		}
		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(returnData)];
	}
}