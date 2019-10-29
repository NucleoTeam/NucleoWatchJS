import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExecutionsService {
  data = {
    all: {},
    chains: [],
    hosts: [],
    ips: [],
    callKeys: [],
  };
  filters = {
    host: undefined,
    ip: undefined,
    chain: undefined,
    retries: undefined,
    status: undefined,
    time: undefined
  };

  clear() {
    this.data = {
      all: {},
      chains: [],
      hosts: [],
      ips: [],
      callKeys: [],
    };
  }
  clearFilter() {
    this.filters = {
      host: undefined,
      ip: undefined,
      chain: undefined,
      retries: undefined,
      status: undefined,
      time: undefined
    };
  }
  filter(key, val) {
    if (this.filters[key] === val) {
      this.filters[key] = undefined;
      return;
    }
    this.filters[key] = val;
  }
  addChain(chain) {
    if (chain === '' || chain === undefined) {
      return;
    }
    if (this.data.chains.filter((element, idx, array) => element === chain ).length === 0) {
      this.data.chains.push(chain);
      this.data.chains.sort();
    }
  }
  addHost(host) {
    if (host === '' || host === undefined) {
      return;
    }
    if (this.data.hosts.filter((element, idx, array) => element === host ).length === 0) {
      this.data.hosts.push(host);
      this.data.hosts.sort();
    }
  }
  addRootKey(key) {
    if (key === '' || key === undefined) {
      return;
    }
    if (this.data.callKeys.filter((element, idx, array) => element === key ).length === 0) {
      this.data.callKeys.push(key);
    }
  }
  addIP(ip) {
    if (ip === '' || ip === undefined) {
      return;
    }
    if (this.data.ips.filter((element, idx, array) => element === ip ).length === 0) {
      this.data.ips.push(ip);
      this.data.ips.sort();
    }
  }
  checkStep(step, keepType) {
    if (this.filters.host !== undefined && this.filters.host === step.host) {
      if (!keepType.includes('host')) {
        keepType.push('host');
        keepType.sort();
      }
    }
    if (this.filters.ip !== undefined && this.filters.ip === step.ip) {
      if (!keepType.includes('ip')) {
        keepType.push('ip');
        keepType.sort();
      }
    }
    if (this.filters.chain !== '' && this.filters.chain !== undefined && this.filters.chain === step.step) {
      if (!keepType.includes('chain')) {
        keepType.push('chain');
        keepType.sort();
      }
    }
  }
  checkCall(call, keepType) {
    if (this.filters.retries !== undefined && this.filters.retries === call.retries) {
      if (!keepType.includes('retries')) {
        keepType.push('retries');
        keepType.sort();
      }
    }
    if (this.filters.status !== undefined && this.filters.status === call.status) {
      if (!keepType.includes('status')) {
        keepType.push('status');
        keepType.sort();
      }
    }
    if (this.filters.time !== undefined && this.filters.time <= call.execution.total) {
      if (!keepType.includes('time')) {
        keepType.push('time');
        keepType.sort();
      }
    }
    return false;
  }
  equal(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  filtered() {
    const self = this;
    const totalFilters = Object.keys(self.filters).filter((x) => self.filters[x] !== undefined);
    console.log(totalFilters);
    if (totalFilters.length === 0) {
      return Object.keys(self.data.all);
    }
    const match = totalFilters;
    match.sort();
    return Object.keys(this.data.all).filter((root) => {
      let found = false;
      const keepType = [];
      this.checkCall(this.data.all[root].latest, keepType);
      Object.keys(this.data.all[root].attempts).forEach((retry) => {
        if (found || self.equal(keepType, match)) {
          found = true;
          return;
        }
        this.data.all[root].attempts[retry].forEach((call) => {
          if (found || self.equal(keepType, match)) {
            found = true;
            return;
          }
          this.checkStep(call.execution, keepType);
          if (call.steps.length > 0 && !self.equal(keepType, match)) {
            call.steps.forEach((step) => {
              this.checkStep(step, keepType);
            });
          }
        });
      });
      return found;
    });
  }
  store(dataCall) {
    this.addRootKey(dataCall.root);
    dataCall.steps.forEach((step) => {
      this.addHost(step.host);
      this.addChain(step.step);
      this.addIP(step.ip);
    });
    this.addHost(dataCall.host);
    this.addChain(dataCall.step);
    this.addIP(dataCall.ip);

    if (!this.data.all[dataCall.root]) {
      this.data.all[dataCall.root] = {};
    }
    if (!this.data.all[dataCall.root].latest
      || (this.data.all[dataCall.root].latest.retries <= dataCall.retries
        && this.data.all[dataCall.root].latest.version <= dataCall.version)
      || this.data.all[dataCall.root].latest.retries < dataCall.retries
      || dataCall.status === 'timeout'
    ) {
      this.data.all[dataCall.root].latest = dataCall;
    }
    if (!this.data.all[dataCall.root].attempts) {
      this.data.all[dataCall.root].attempts = [];
    }
    if (!this.data.all[dataCall.root].attempts[dataCall.retries]) {
      this.data.all[dataCall.root].attempts[dataCall.retries] = [];
    }
    if (dataCall !== undefined) {
      this.data.all[dataCall.root].attempts[dataCall.retries].push(dataCall);
    }
  }
  constructor() { }
}
