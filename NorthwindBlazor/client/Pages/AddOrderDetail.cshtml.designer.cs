﻿using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;
using Microsoft.AspNetCore.Blazor.Services;
using client.Shared;
using Radzen;
using Radzen.Blazor;
using NorthwindBlazor.Models.Northwind;

namespace NorthwindBlazor.App.Pages
{
    public partial class AddOrderDetailModel : BlazorComponent
    {
        [Inject]
        NorthwindService Northwind { get; set; }

        [Inject]
        IUriHelper UriHelper { get; set; }

        protected RadzenContent content1;

        protected RadzenHeading pageTitle;

        protected RadzenTemplateForm<OrderDetail> form0;

        protected RadzenLabel label1;

        protected RadzenDropDown orderId;

        protected RadzenRequiredValidator orderIdRequiredValidator;

        protected RadzenLabel label2;

        protected RadzenDropDown productId;

        protected RadzenRequiredValidator productIdRequiredValidator;

        protected RadzenLabel label3;

        protected dynamic unitPrice;

        protected RadzenLabel label4;

        protected dynamic quantity;

        protected RadzenLabel label5;

        protected dynamic discount;

        protected RadzenButton button1;

        protected RadzenButton button2;

        IEnumerable<Order> _getOrdersResult;
        protected IEnumerable<Order> getOrdersResult
        {
            get
            {
                return _getOrdersResult;
            }
            set
            {
                if(_getOrdersResult != value)
                {
                    _getOrdersResult = value;
                    StateHasChanged();
                }
            }
        }

        IEnumerable<Product> _getProductsResult;
        protected IEnumerable<Product> getProductsResult
        {
            get
            {
                return _getProductsResult;
            }
            set
            {
                if(_getProductsResult != value)
                {
                    _getProductsResult = value;
                    StateHasChanged();
                }
            }
        }

        OrderDetail _orderdetail;
        protected OrderDetail orderdetail
        {
            get
            {
                return _orderdetail;
            }
            set
            {
                if(_orderdetail != value)
                {
                    _orderdetail = value;
                    StateHasChanged();
                }
            }
        }

        protected override async Task OnInitAsync()
        {
            Northwind.BasePath = UriHelper.GetBaseUri();

            await Task.Run(Load);
        }

        protected async void Load()
        {
            var northwindGetOrdersResult = await Northwind.GetOrders(null, null, null, null, null, null, null, null);
                getOrdersResult = northwindGetOrdersResult.Data;

            var northwindGetProductsResult = await Northwind.GetProducts(null, null, null, null, null, null, null, null);
                getProductsResult = northwindGetProductsResult.Data;

            orderdetail = new OrderDetail();
        }

        protected async void Form0Submit(OrderDetail args)
        {
            var northwindCreateOrderDetailResult = await Northwind.CreateOrderDetail(orderdetail);
                UriHelper.NavigateTo("OrderDetails");
        }

        protected async void Button2Click(UIMouseEventArgs args)
        {
            UriHelper.NavigateTo("OrderDetails");
        }
    }
}
