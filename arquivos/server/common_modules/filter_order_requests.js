function ord_fil_req(req, res) {
    var where_statement = {};
    var order_statement = [];

    if(req.params.user_email !== undefined) {
        where_statement = {
            user_id: req.params.user_email,
        }
    }

    if(req.method === "POST") {
        var filters = {
            status: ["Pendente", "Rejeitado", "Cancelado", "Aceite"],
        };
        var order = ["date"];
    
        var req_filter_arr = Object.keys(req.body.filters);
        var req_order_arr = Object.keys(req.body.order);
        
        for(i in req_filter_arr) {
            if(!(Object.keys(filters).includes(req_filter_arr[i]))) {
                res.end();
                return;
            }
    
            if(req.body.filters[req_filter_arr[i]] !== "") {
                where_statement[req_filter_arr[i]] = req.body.filters[req_filter_arr[i]];
            }
        }
    
        for(i in req_order_arr) {
            if(!(order.includes(req_order_arr[i]))) {
                res.end();
                return;
            }
    
            if(req.body.order[req_order_arr[i]] !== "") {
                order_statement.push(["createdAt", req.body.order.date]);
            }
        }
    }

    console.log({
        where: where_statement, 
        order: order_statement,
    });

    return {
        where: where_statement, 
        order: order_statement,
    };
}

module.exports = {
    order_filter_request: ord_fil_req,
}