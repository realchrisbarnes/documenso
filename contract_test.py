#!/usr/bin/env python3
"""Repository-owned Documenso contract, with runtime lint only when installed."""
import json
import re
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parent


def main():
    checks = 0
    try:
        package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
        lock = json.loads((ROOT / "package-lock.json").read_text(encoding="utf-8"))
        root_lock = lock.get("packages", {}).get("")
        assert isinstance(root_lock, dict), "package-lock root contract missing"
        checks += 1
        assert package.get("name") == root_lock.get("name"), "package name and lock drift"
        checks += 1
        assert package.get("version") == root_lock.get("version"), "package version and lock drift"
        checks += 1
        assert lock.get("lockfileVersion") == 3, "unsupported lockfile version"
        checks += 1
        scripts = package.get("scripts")
        assert isinstance(scripts, dict) and scripts.get("lint") == "biome check .", "declared lint contract missing or changed"
        checks += 1
        assert re.fullmatch(r"npm@\d+\.\d+\.\d+", str(package.get("packageManager") or "")), "package manager is not exact-pinned"
        checks += 1
        runtime_available = (ROOT / "node_modules/.bin/biome").is_file()
        verification_class = "contract_tested"
        if runtime_available:
            result = subprocess.run(
                ["npm", "run", "lint"], cwd=ROOT, timeout=300, check=False,
            )
            assert result.returncode == 0, f"declared lint command exited {result.returncode}"
            checks += 1
            verification_class = "runtime_tested"
    except (AssertionError, OSError, UnicodeError, ValueError, subprocess.TimeoutExpired) as exc:
        print(f"Contract tests: 1 failed | {type(exc).__name__}: {exc}")
        return 1
    detail = {
        "verification_class": verification_class,
        "runtime_available": runtime_available,
        "unavailable_reason": None if runtime_available else "DECLARED_NODE_DEPENDENCIES_NOT_INSTALLED",
    }
    print(f"Contract tests: {checks} passed | " + json.dumps(detail, sort_keys=True, separators=(",", ":")))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
