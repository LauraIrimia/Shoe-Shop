package shop.dto;

import shop.entity.Address;
import shop.entity.Customer;
import shop.entity.Order;
import shop.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
