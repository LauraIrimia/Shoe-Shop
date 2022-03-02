package shop.service;

import shop.dto.Purchase;
import shop.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
