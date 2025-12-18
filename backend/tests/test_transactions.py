def test_create_and_list(client):
    response = client.post(
        "/api/v1/transactions/",
        json={
            "account_id": 1,
            "category_id": 1,
            "amount": 100.0,
            "type": "income",
            "date": "2025-12-01",
            "note": "Test income",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["amount"] == 100.0

    response = client.get("/api/v1/transactions/")
    assert response.status_code == 200
    assert len(response.json()) == 1
