// ConsoleApplication1.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <functional>
#include <memory>

namespace heron
{
	template<typename T>
	struct mapped_function {
		int64_t _length;
		std::function<T(int64_t) const> function;
		int64_t length() const { return _length; }
		T at(int64_t i) const { return function(i); }
	};

	template<typename T, typename U, typename TArray>
	struct mapped_array {
		TArray array;
		std::function<T(U) const> function;
		int64_t length() const { return array.length(); }
		T at(int64_t i) const { return function(array.at(i)); }
	};

	template<typename T>
	struct array {		
		std::shared_ptr<std::vector<T>> data;
		int64_t length() const { return data->size(); }
		T at(int64_t i) const { return (*data)[i];  }
	};
}

// Mutable arrays are shared::ptr<std::vectors>

int main()
{
    return 0;
}

