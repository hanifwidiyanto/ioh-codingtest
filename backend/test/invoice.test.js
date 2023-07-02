import request from "supertest";
import app from "../app.js";

describe("Invoice Controllers", () => {
  let invoiceNumber;
  let token;

  beforeAll(async () => {
    // Log in to get the authentication token
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "updated31@example.com", password: "newpassword" });

    token = response.body.token;
  });

  afterAll(async () => {
    // Log out to invalidate the authentication token
    await request(app).post("/api/users/logout");
  });

  it("should create a new invoice", async () => {
    const response = await request(app)
      .post("/api/invoices")
      .set("Cookie", [`jwt=${token}`])
      .send({
        items: [
          {
            item_id: 2,
            quantity: 2,
          },
          {
            item_id: 3,
            quantity: 3,
          },
        ],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.invoice).toBeDefined();

    invoiceNumber = response.body.invoice.invoice_number;
  });

  it("should get all invoices", async () => {
    const response = await request(app)
      .get("/api/invoices")
      .set("Cookie", [`jwt=${token}`]);

    expect(response.statusCode).toBe(200);
    expect(response.body.invoices).toBeDefined();
    expect(Array.isArray(response.body.invoices)).toBe(true);
  });

  it("should get an invoice by ID", async () => {
    const response = await request(app)
      .get(`/api/invoices/${invoiceNumber}`)
      .set("Cookie", [`jwt=${token}`]);

    expect(response.statusCode).toBe(200);
    expect(response.body.invoice).toBeDefined();
  });

  it("should update an invoice by ID", async () => {
    const response = await request(app)
      .put(`/api/invoices/${invoiceNumber}`)
      .set('Cookie', [`jwt=${token}`])
      .send({
        items: [
          {
            item_id: 2,
            quantity: 5,
          },
        ],
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Invoice updated successfully");
  });

  it("should delete an invoice by ID", async () => {
    const response = await request(app)
      .delete(`/api/invoices/${invoiceNumber}`)
      .set('Cookie', [`jwt=${token}`]);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Invoice deleted successfully");
  });
});
