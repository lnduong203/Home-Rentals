import React, { useState } from "react";

const PaymentForm = () => {
    const [amount, setAmount] = useState("");
    const [bankCode, setBankCode] = useState("");
    const [language, setLanguage] = useState("vn");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const response = await fetch("http://localhost:6789/bookings/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                // orderDescription,
                // orderType,
                bankCode,
                language: "vn",
            }),
        });

        const data = await response.json();
        window.location.href = data.paymentUrl;
    };

    return (
        <div className="table-responsive">
            <form id="createOrder" action="create_payment_url" method="POST" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Số tiền</label>
                    <input
                        className="form-control"
                        id="amount"
                        name="amount"
                        placeholder="Số tiền"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Chọn Phương thức thanh toán:</label>
                    <div className="controls">
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="bankCode"
                                id="defaultPaymentMethod"
                                value=""
                                checked={bankCode === ""}
                                onChange={() => setBankCode("")}
                            />
                            Cổng thanh toán VNPAYQR
                        </label>
                    </div>
                    <div className="controls">
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="bankCode"
                                id="vnpayqrPaymentMethod"
                                value="VNPAYQR"
                                checked={bankCode === "VNPAYQR"}
                                onChange={() => setBankCode("VNPAYQR")}
                            />
                            Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                        </label>
                    </div>
                    <div className="controls">
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="bankCode"
                                id="vnbankPaymentMethod"
                                value="VNBANK"
                                checked={bankCode === "VNBANK"}
                                onChange={() => setBankCode("VNBANK")}
                            />
                            Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                        </label>
                    </div>
                    <div className="controls">
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="bankCode"
                                id="intcardPaymentMethod"
                                value="INTCARD"
                                checked={bankCode === "INTCARD"}
                                onChange={() => setBankCode("INTCARD")}
                            />
                            Thanh toán qua thẻ quốc tế
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Ngôn ngữ</label>
                    <div className="controls">
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="language"
                                id="vnLanguage"
                                value="vn"
                                checked={language === "vn"}
                                onChange={() => setLanguage("vn")}
                            />
                            Tiếng việt
                        </label>
                    </div>
                    <div className="controls">
                        <label className="radio-inline">
                            <input
                                type="radio"
                                name="language"
                                id="enLanguage"
                                value="en"
                                checked={language === "en"}
                                onChange={() => setLanguage("en")}
                            />
                            Tiếng anh
                        </label>
                    </div>
                </div>

                <button className="btn btn-default" id="btnPopup" type="submit">
                    Thanh toán
                </button>
            </form>
            <p>&nbsp;</p>
        </div>
    );
};

export default PaymentForm;