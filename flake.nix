{
  description = "find-floppyd-sk development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.05";
  };

  outputs = { nixpkgs ,... }: let
    system = "x86_64-linux";
  in {
    devShells."${system}".default = let
      pkgs = import nixpkgs {
        inherit system;
      };
    in pkgs.mkShell {
      name = "find.floppyd.sk";
      packages = with pkgs; [
        bash
        gh
        nodejs_22
        zsh
      ];

      shellHook = ''
        export SHELL="/run/current-system/sw/bin/zsh"
        sudo ln -sfn /run/current-system/sw/bin/bash /bin/bash
        echo "node `node --version`"
      '';
    };
  };
}
