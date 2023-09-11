
function return_response (res, ans){
    res.set("Content-type", "application/json");
    if (ans.status === 500){
        res.status(500).json({"error": "something went wrong"});
    }
    else if (ans.status === 400){
        res.status(400).json({"error": "missing or invalid details"});
    }
    else if (ans.status === 404){
        res.status(404).json({"error": "page not found"});
    }
    else {
        delete ans.status;
        res.status(200).json(ans.result);
    }
}


module.exports = {
    return_response,
}