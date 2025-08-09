// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title Animal Adoption (Sepolia demo)
/// @notice Simple payable contract for virtual animal adoptions and "feeding"
contract Adoption {
    struct Pet {
        address adopter;
        uint256 balance;    // total wei contributed for this pet
        string petId;
        uint256 lastFedAt;  // unix timestamp of last feed
    }

    /// petId => Pet
    mapping(string => Pet) private pets;

    /// Owner (deployer) can withdraw accumulated funds
    address public owner;

    event PetAdopted(address indexed adopter, string petId, uint256 amount);
    event PetFed(address indexed feeder, string petId, uint256 amount);
    event Withdraw(address indexed owner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Adopt a pet. Each `petId` can be adopted once.
    /// @param petId The unique id of the pet (e.g., "cat-1")
    function adoptPet(string calldata petId) external payable {
        require(msg.value > 0, "Must send ETH to adopt");
        require(pets[petId].adopter == address(0), "Already adopted");

        pets[petId] = Pet({
            adopter: msg.sender,
            balance: msg.value,
            petId: petId,
            lastFedAt: block.timestamp
        });

        emit PetAdopted(msg.sender, petId, msg.value);
    }

    /// @notice Feed a pet by sending ETH to it. Anyone can feed any pet.
    /// @param petId The unique id of the pet
    function feedPet(string calldata petId) external payable {
        require(msg.value > 0, "Must send ETH to feed");
        require(bytes(pets[petId].petId).length != 0, "Pet does not exist");

        pets[petId].balance += msg.value;
        pets[petId].lastFedAt = block.timestamp;

        emit PetFed(msg.sender, petId, msg.value);
    }

    /// @notice Get public info about a pet
    /// @param petId The unique id of the pet
    /// @return _petId the string id
    /// @return _balance the total wei contributed to this pet
    /// @return _adopter address of adopter (zero address if none)
    function getPetInfo(string calldata petId) external view returns (string memory _petId, uint256 _balance, address _adopter) {
        Pet storage p = pets[petId];
        return (p.petId, p.balance, p.adopter);
    }

    /// @notice Withdraw contract balance to owner
    function withdraw() external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No funds");
        (bool ok, ) = payable(owner).call{value: amount}("");
        require(ok, "Transfer failed");
        emit Withdraw(owner, amount);
    }

    /// @notice Fallback to accept direct ETH transfers
    receive() external payable {}
}
