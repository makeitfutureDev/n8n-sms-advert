import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SMSAdvertApi implements ICredentialType {
	name = 'smsAdvertApi';
	displayName = 'SMSAdvert API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: {
		password: true,
	},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.smsadvert.ro/api/',
			url: '/Devices/list/all/',
		},
	};
	documentationUrl = 'https://www.smsadvert.ro/api/';

}