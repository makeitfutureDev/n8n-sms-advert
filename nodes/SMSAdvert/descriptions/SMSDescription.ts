import type { INodeProperties } from 'n8n-workflow';

export const SMSOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sms'],
			},
		},
		options: [
			{
				name: 'Get Devices',
				value: 'getDevice',
				description: 'Get all devices',
				action: 'Get device list',
			},
			{
				name: 'Get Account Details',
				value: 'getAccountDetails',
				description: 'Get your account details and available units',
				action: 'Get account details',
			},
			{
				name: 'Get SMS Api Queue',
				value: 'getApiQueue',
				description: 'Get current count of messages in the API queue',
				action: 'Get SMS API queue count',
			},
			{
				name: 'Send a Message',
				value: 'textToPhoneNumber',
				description: 'Send a text to a phone number',
				action: 'Send text to phone number',
			},
		],
		default: 'getDevice',
	},
];

export const smsFields: INodeProperties[] = [

/* -------------------------------------------------------------------------- */
/*                             sms:textToPhoneNumber                          */
/* -------------------------------------------------------------------------- */

{
	displayName: 'Mobile Number',
	name: 'mobileNumber',
	type: 'string',
	required: true,
	placeholder: '+1234567890',
	description: 'The phone number to send the SMS to',
	displayOptions: {
		show: {
			resource: ['sms'],
			operation: ['textToPhoneNumber'],
		},
	},
	default: undefined
},

{
	displayName: 'Message',
	name: 'message',
	type: 'string',
	required: true,
	typeOptions: {
		rows: 4,
	},
	description: 'The content of the SMS message',
	displayOptions: {
		show: {
			resource: ['sms'],
			operation: ['textToPhoneNumber'],
		},
	},
	default: undefined
},

{
	displayName: 'Sender Type',
	name: 'senderType',
	type: 'options',
	required: true,
	options: [
		{
			name: 'smsAdvert network',
			value: 'smsAdvert',
		},
		{
			name: 'ownNumber',
			value: 'ownNumber',
		},
	],
	description: 'Choose the sender of the SMS',
	displayOptions: {
		show: {
			resource: ['sms'],
			operation: ['textToPhoneNumber'],
		},
	},
	default: 'smsAdverts'
},

{
	displayName: 'Confirm Status Webhook',
	name: 'confirmStatusWebhook',
	type: 'string',
	placeholder: 'https://example.com/webhook',
	description: 'Optional webhook URL to receive delivery confirmation',
	displayOptions: {
		show: {
			resource: ['sms'],
			operation: ['textToPhoneNumber'],
		},
	},
	default: undefined
},

];