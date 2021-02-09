class DescentCalculator {
  constructor(
    start_alt = null,
    dest_alt = null,
    kias = null,
    distance_nm = null
  ) {
    this.start_alt = start_alt;
    this.dest_alt = dest_alt;
    this.kias = kias;
    this.distance_nm = distance_nm;
    this.descent_angle = 3;
    this.descent_required_min = null;
    this.fpm_with_speed = null;
    this.statement_min_fpm = null;
    this.statement_fpm_with_speed = null;
  }
  _required_distance() {
    const descent_degree = 3;
    return (this.start_alt - this.dest_alt) / 100 / descent_degree;
  }
  _kts_per_minute() {
    return this.kias / 60;
  }
  _fpm_descent_fixed_angle() {
    return this.descent_angle * this._kts_per_minute() * 100;
  }
  _fpm_descent_min() {
    this.descent_required_min =
      (this.start_alt - this.dest_alt) / this.distance_nm;
  }
  _time_to_travel_d() {
    return this.distance_nm / this.kias;
  }
  _fpm_distance_and_speed() {
    // THIS REQUIRES TRY CATCH FOR DIV ZERO
    try {
      const feet_per_nm = (this.start_alt - this.dest_alt) / this.distance_nm;
      const descent_angle_varying = feet_per_nm / 100;
      const descent_fpm = descent_angle_varying * this._kts_per_minute() * 100;
      this.fpm_with_speed = descent_fpm;
    } catch (err) {
      console.log("Divided by zero!");
      this.fpm_with_speed = 0;
    }
  }
  _statement_min_fpm_required() {
    this.statement_min_fpm = `${this.dest_alt - this.start_alt}ft over ${
      this.distance_nm
    }nm requires a minimum descent of ${this.descent_required_min} fpm`;
  }
  _statement_fpm_with_speed() {
    this.statement_fpm_with_speed = `${this.dest_alt - this.start_alt}ft over ${
      this.distance_nm
    }nm at ${this.kias} kias requires a descent of ${this.fpm_with_speed} fpm`;
  }
  generate_print_statements() {
    this._statement_min_fpm_required();
    this._statement_fpm_with_speed();
  }
  run() {
    console.log("CALC RUNNING");
    this._fpm_distance_and_speed();
    this.generate_print_statements();
    console.log(this.statement_fpm_with_speed)
  }
}

export default DescentCalculator;
