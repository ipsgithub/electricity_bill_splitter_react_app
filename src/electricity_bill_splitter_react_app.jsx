import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ElectricityBillSplitter() {
  const [form, setForm] = useState({
    mfc: 40,
    ed: 56.34,
    meterRent: 40,
    rebate: -29.8,
    digitalRebate: -56.75,
    totalUnits: 210,
    h1: 53,
    h2: 196,
    h3: 49,
    s1Units: 50,
    s1Rate: 2.9,
    s2Units: 150,
    s2Rate: 4.7,
    s3Rate: 5.7,
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: Number(value) || 0 }));
  };

  const result = useMemo(() => {
    const houses = [
      { name: "H1", units: form.h1 },
      { name: "H2", units: form.h2 },
      { name: "H3", units: form.h3 },
    ];

    const misc =
      form.mfc + form.ed + form.meterRent + form.rebate + form.digitalRebate;

    const s1Alloc = [16, 17, 17];
    const remainingAfterS1 = houses.map((h, i) => Math.max(h.units - s1Alloc[i], 0));

    const s2Base = remainingAfterS1.map((r) => Math.min(r, form.s2Units / 3));
    const s2Used = s2Base.reduce((a, b) => a + b, 0);
    const leftoverS2 = form.s2Units - s2Used;

    const maxIndex = houses.reduce(
      (max, h, i, arr) => (h.units > arr[max].units ? i : max),
      0
    );

    const s2Alloc = [...s2Base];
    s2Alloc[maxIndex] += leftoverS2;

    const perHouse = houses.map((house, i) => {
      const s1 = Math.min(s1Alloc[i], house.units);
      const s2 = Math.min(s2Alloc[i], remainingAfterS1[i]);
      const s3 = Math.max(house.units - s1 - s2, 0);

      const energy =
        s1 * form.s1Rate + s2 * form.s2Rate + s3 * form.s3Rate;

      const total = energy + misc / houses.length;

      return {
        name: house.name,
        units: house.units,
        s1,
        s2,
        s3,
        energy,
        total,
      };
    });

    const totalEnergy = perHouse.reduce((sum, h) => sum + h.energy, 0);
    const grandTotal = totalEnergy + misc;

    return {
      misc,
      perHouse,
      totalEnergy,
      grandTotal,
    };
  }, [form]);

  const fields = [
    ["mfc", "MFC/CUST Charge"],
    ["ed", "ED Charge"],
    ["meterRent", "Meter Rent"],
    ["rebate", "Rebate"],
    ["digitalRebate", "Digital Rebate"],
    ["h1", "H1 Units"],
    ["h2", "H2 Units"],
    ["h3", "H3 Units"],
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-semibold">Electricity Bill Splitter</h1>
          {fields.map(([key, label]) => (
            <div key={key} className="space-y-1">
              <label className="text-sm font-medium">{label}</label>
              <Input
                type="number"
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Bill Split</h2>
          <p className="text-sm">Misc Charges: ₹{result.misc.toFixed(2)}</p>

          {result.perHouse.map((house) => (
            <div key={house.name} className="border rounded-xl p-3">
              <div className="font-medium">{house.name}</div>
              <div className="text-sm">Units: {house.units}</div>
              <div className="text-sm">S1: {house.s1}</div>
              <div className="text-sm">S2: {house.s2}</div>
              <div className="text-sm">S3: {house.s3}</div>
              <div className="text-sm">Energy: ₹{house.energy.toFixed(2)}</div>
              <div className="font-semibold">Pay: ₹{house.total.toFixed(2)}</div>
            </div>
          ))}

          <div className="pt-2 border-t">
            <div className="font-medium">Grand Total: ₹{result.grandTotal.toFixed(2)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
