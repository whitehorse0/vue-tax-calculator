const roundValue = value => Math.round(value * 100) / 100;

class CalculateTax {
  constructor(salary, ptkp) {
    this.salary = salary;
    this.ptkp = ptkp;
    this.pph = [0, 0, 0, 0];
    this.thr = 0;
    this.ptkpList = {
      single: 54000000,
      married: 58500000,
      married_with_1: 63000000,
      married_with_2: 67500000,
      married_with_3: 72000000
    };
    this.incomeLines = [
      { range: 50000000, value: 0.05 },
      { range: 250000000, value: 0.15 },
      { range: 500000000, value: 0.25 },
      { range: 1000000000, value: 0.3 }
    ];
  }

  getSalaryPerYear() {
    return this.salary * 12;
  }

  getBruto() {
    return this.getSalaryPerYear() + this.thr;
  }

  getBiayaJabatan() {
    const biayaJabatanSetahun = 6000000;
    let percent = this.getSalaryPerYear() * 0.05;
    percent = percent > biayaJabatanSetahun ? biayaJabatanSetahun : percent;
    return percent;
  }

  getNetto() {
    return this.getBruto() - this.getBiayaJabatan();
  }

  getPKP() {
    let pkp = this.getNetto() - this.ptkpList[this.ptkp];
    if (pkp < 0) pkp = 0;
    return pkp;
  }

  setPPH(i, amount, list) {
    if (i >= this.pph.length) return;
    var again = true;
    var temp = 0;

    if (amount < list[i].range) {
      temp = amount;
      again = false;
    } else {
      temp = list[i].range;
    }

    this.pph[i] = temp * list[i].value;
    if (again) {
      this.setPPH(i + 1, amount - list[i].range, list);
    } else {
      this.setPPH(i + 1, 0, list);
    }
  }

  getTotalPPH() {
    return this.pph.reduce((sum, n) => sum + n);
  }

  getTotalPPHBulanan() {
    return this.getTotalPPH() / 12;
  }

  getTotalSalary() {
    return this.getNetto() - this.getTotalPPH();
  }

  getTotalSalaryPerbulan() {
    return this.getTotalSalary() / 12;
  }

  getRatio() {
    let percent =
      (this.getTotalPPHBulanan() / this.getTotalSalaryPerbulan()) * 100;

    if (this.getTotalSalaryPerbulan() < 0) {
      percent = 0;
    } else {
      percent = roundValue(percent);
    }

    return percent + ' %';
  }
}

const calcTaxes = inputs => {
  const tax = new CalculateTax(parseInt(inputs.incomeValue), inputs.ptkp);
  tax.setPPH(0, tax.getPKP(), tax.incomeLines);

  const gaji_per_bulan = inputs.incomeValue;
  const gaji_per_tahun = tax.getSalaryPerYear();
  const tax_per_tahun = tax.getTotalPPH();
  const tax_per_bulan = tax.getTotalPPHBulanan();
  const total_gaji = tax.getTotalSalary();
  const total_gaji_perbulan = tax.getTotalSalaryPerbulan();
  const ratio = tax.getRatio();
  const bruto = tax.getBruto();
  const biayaJabatan = tax.getBiayaJabatan();
  const netto = tax.getNetto();
  const ptkp = tax.ptkpList[inputs.ptkp];
  const pkp = tax.getPKP();
  const pph = tax.pph;

  const test = pph.map((value, index) => {
    const object = {};
    object['label'] = tax.incomeLines[index].value * 100;
    object['value'] = value;
    return object;
  });

  const result = {
    gaji_per_bulan,
    gaji_per_tahun,
    tax_per_tahun,
    tax_per_bulan,
    total_gaji,
    total_gaji_perbulan,
    ratio,
    bruto,
    biayaJabatan,
    netto,
    ptkp,
    pkp,
    test
  };

  return result;
};

export { calcTaxes };
