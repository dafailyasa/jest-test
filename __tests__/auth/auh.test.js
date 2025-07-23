const { post, get } = require('../../utils/request');
const { StatusCodes } = require('http-status-codes');

describe('Add New Customer', () => {
    let jwtToken = '';
    // digunakan untuk mendapatkan akses token yang dimana
    //  digunakan untuk test case api yang lain
        beforeAll(async () => {
        const input = {
            username: 'abcdefgh',
            password: 'kps12345',
        };
        // digunakan untuk mendapatkan akses token
        const res = await post('/api/security/sign-in', input);


        // status code
        expect(res.status).toBe(StatusCodes.OK);

        // response data
        expect(res.data).toHaveProperty('accessToken');
        expect(res.data.accessToken).not.toBeNull();
        expect(res.data.username).toEqual(input.username);

        // set auth token to test in user info
        // untuk autorisasi 
        jwtToken = res.data.accessToken;
    });

  // Test Case clear all field > save
  test('Should save new customer with valid data', async () => {
    const newCustomer = {
        "transaction_type": "ADD",
        "company_id": null,
        "channel_id": null,
        "brand_name": null,
        "brand_address": null,
        "brand_zip": null,
        "brand_phone": null,
        "brand_pic_id": null,
        "brand_contact_name": null,
        "site_id": null,
        "province_id": null,
        "city_id": null,
        "district_id": null,
        "sub_district_id": null,
        "pkp_status": null,
        "npwp": null,
        "top_id": null,
        "nppkp": null,
        "brand_fax": null,
        "brand_email": null
    } 

    try {
      await post('/api/sales/mitra-bisnis/customer', newCustomer,{
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
      });
    } catch (err) {
        expect(err.response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(err.response.data).toHaveProperty('error_message');
        expect(err.response.data.error_message).toEqual('Silahkan diperiksa kembali data yang digunakan untuk SIGN IN.');
    }
  });
});