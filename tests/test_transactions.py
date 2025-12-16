def test_create_and_list(client):
    # create
    r = client.post("/api/v1/transactions/", json={
        "account_id": 1,
        "category_id": 2,
        "amount": "100.00",
        "type": "income",
        "date": "2025-12-01"
    })

    assert r.status_code == 200
    body = r.json()
    assert "id" in body

    # list
    r2 = client.get("/api/v1/transactions/")
    assert r2.status_code == 200
    assert len(r2.json()) == 1
